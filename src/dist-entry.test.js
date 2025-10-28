// tests/dist-entry.test.ts
import { describe, it, expect } from 'vitest';
import * as Lib from 'shopify-money-format-utils'; // self-import via exports map

const NUM = 1134.65;

describe('package entry (exports map)', () => {
  it('exposes named functions', () => {
    expect(typeof Lib.formatMoney).toBe('function');
    expect(typeof Lib.parseMoney).toBe('function');
  });
});

describe('formatMoney (all formats)', () => {
  it('amount', () => {
    expect(Lib.formatMoney(NUM, 'amount')).toBe('1,134.65');
  });

  it('amount_no_decimals', () => {
    expect(Lib.formatMoney(NUM, 'amount_no_decimals')).toBe('1,135');
  });

  it('amount_with_comma_separator', () => {
    expect(Lib.formatMoney(NUM, 'amount_with_comma_separator')).toBe('1.134,65');
  });

  it('amount_no_decimals_with_comma_separator', () => {
    expect(Lib.formatMoney(NUM, 'amount_no_decimals_with_comma_separator')).toBe('1.135');
  });

  it('amount_with_apostrophe_separator', () => {
    // normalized ASCII apostrophe
    const out = Lib.formatMoney(NUM, 'amount_with_apostrophe_separator');
    expect(out).toBe("1'134.65");
    expect(out.includes('\u2019')).toBe(false); // no smart apostrophe
  });

  it('amount_no_decimals_with_space_separator', () => {
    // normalized plain space
    const out = Lib.formatMoney(NUM, 'amount_no_decimals_with_space_separator');
    expect(out).toBe('1 135');
    expect(out.includes('\u202f')).toBe(false); // no narrow nbsp
    expect(out.includes('\u00a0')).toBe(false); // no nbsp
  });

  it('amount_with_space_separator', () => {
    const out = Lib.formatMoney(NUM, 'amount_with_space_separator');
    expect(out).toBe('1 134,65');
    expect(out.includes('\u202f')).toBe(false);
    expect(out.includes('\u00a0')).toBe(false);
  });

  it('amount_with_period_and_space_separator', () => {
    expect(Lib.formatMoney(NUM, 'amount_with_period_and_space_separator')).toBe('1 134.65');
  });

  it('symbol placement + trimming + case-insensitive position', () => {
    expect(Lib.formatMoney(NUM, 'amount', { symbol: '$', position: ' start ' })).toBe('$1,134.65');
    expect(Lib.formatMoney(NUM, 'amount', { symbol: '€', position: ' END ' })).toBe('1,134.65€');
    // no symbol returns plain formatted value
    expect(Lib.formatMoney(NUM, 'amount', { symbol: '  ', position: 'start' })).toBe('1,134.65');
  });
});

describe('parseMoney (mirrors formats)', () => {
  it('amount', () => {
    expect(Lib.parseMoney('1,134.65', 'amount')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals', () => {
    expect(Lib.parseMoney('1,135', 'amount_no_decimals')).toBeCloseTo(1135, 5);
  });

  it('amount_with_comma_separator', () => {
    expect(Lib.parseMoney('1.134,65', 'amount_with_comma_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals_with_comma_separator', () => {
    expect(Lib.parseMoney('1.135', 'amount_no_decimals_with_comma_separator')).toBeCloseTo(1135, 5);
  });

  it('amount_with_apostrophe_separator', () => {
    expect(Lib.parseMoney("1'134.65", 'amount_with_apostrophe_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals_with_space_separator', () => {
    expect(Lib.parseMoney('1 135', 'amount_no_decimals_with_space_separator')).toBeCloseTo(1135, 5);
  });

  it('amount_with_space_separator', () => {
    expect(Lib.parseMoney('1 134,65', 'amount_with_space_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_with_period_and_space_separator', () => {
    expect(Lib.parseMoney('1 134.65', 'amount_with_period_and_space_separator')).toBeCloseTo(NUM, 2);
  });

  it('handles locale artifacts in input (smart apostrophe & narrow spaces)', () => {
    // ’ (U+2019) and narrow nbsp (U+202F) must parse correctly
    expect(Lib.parseMoney('1\u2019134.65', 'amount_with_apostrophe_separator')).toBeCloseTo(NUM, 2);
    expect(Lib.parseMoney('1\u202f134,65', 'amount_with_space_separator')).toBeCloseTo(NUM, 2);
  });
});

describe('round-trip expectations', () => {
  it('amount → parse → same', () => {
    const s = Lib.formatMoney(NUM, 'amount');
    expect(Lib.parseMoney(s, 'amount')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals → parse → rounded number', () => {
    const s = Lib.formatMoney(NUM, 'amount_no_decimals'); // "1,135"
    expect(Lib.parseMoney(s, 'amount_no_decimals')).toBe(1135);
  });
});
