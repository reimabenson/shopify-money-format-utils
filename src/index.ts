// add once near the top
const normalizeLocaleArtifacts = (s: string) =>
  s
    // normalize various non-breaking / narrow spaces to regular space
    .replace(/\u00A0|\u202F/g, ' ')
    // normalize typographic apostrophe ’ to ASCII '
    .replace(/\u2019/g, "'");

export function formatMoney(value: number | string, format: string = 'amount', options: { symbol?: string; position?: string } = {}): string {
  if (typeof format === 'string') format = format.trim().toLowerCase();

  const num = typeof value === 'number' ? value : parseFloat(value as string);
  if (Number.isNaN(num)) return '';

  let formatted = '';
  switch (format) {
    case 'amount':
      formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      break;
    case 'amount_no_decimals':
      formatted = num.toLocaleString('en-US', { maximumFractionDigits: 0 });
      break;
    case 'amount_with_comma_separator':
      formatted = num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      break;
    case 'amount_no_decimals_with_comma_separator':
      formatted = num.toLocaleString('de-DE', { maximumFractionDigits: 0 });
      break;
    case 'amount_with_apostrophe_separator':
      formatted = num.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      break;
    case 'amount_no_decimals_with_space_separator':
      formatted = num.toLocaleString('fr-FR', { maximumFractionDigits: 0, useGrouping: true });
      break;
    case 'amount_with_space_separator':
      formatted = num.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
      break;
    case 'amount_with_period_and_space_separator': {
      const [i, d] = num.toFixed(2).split('.');
      const intPart = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      formatted = `${intPart}.${d}`;
      break;
    }
    default:
      formatted = num.toFixed(2);
  }

  // normalize locale-specific glyphs (’ and NBSP variants)
  formatted = normalizeLocaleArtifacts(formatted);

  const symbol = (options.symbol ?? '').trim();
  const position = (options.position ?? 'start').toString().trim().toLowerCase();

  if (!symbol) return formatted;
  return position === 'end' ? `${formatted}${symbol}` : `${symbol}${formatted}`;
}

export function parseMoney(formattedValue: string, format: string = 'amount'): number {
  if (typeof formattedValue !== 'string') return NaN;
  if (typeof format === 'string') format = format.trim().toLowerCase();

  // normalize first so parser rules are stable
  let value = normalizeLocaleArtifacts(formattedValue.trim());

  switch (format) {
    case 'amount':
    case 'amount_no_decimals':
      value = value.replace(/,/g, '');
      break;
    case 'amount_with_comma_separator':
      value = value.replace(/\./g, '').replace(/,/g, '.');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = value.replace(/\./g, '');
      break;
    case 'amount_with_apostrophe_separator':
      value = value.replace(/'/g, '');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = value.replace(/ /g, '');
      break;
    case 'amount_with_space_separator':
      value = value.replace(/ /g, '').replace(/,/g, '.');
      break;
    case 'amount_with_period_and_space_separator':
      value = value.replace(/ /g, '');
      break;
    default:
      value = value.replace(/[^\d.-]/g, '');
  }

  value = value.replace(/[^\d.-]/g, '');
  return parseFloat(value);
}
