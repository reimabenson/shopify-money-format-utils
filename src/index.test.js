import { describe, it, expect } from 'vitest';
import { formatMoney, parseMoney } from './index';

const NUM = 1134.65;

describe('formatMoney()', () => {
  it('amount', () => {
    expect(formatMoney(NUM, 'amount')).toBe('1,134.65');
  });

  it('amount_no_decimals', () => {
    expect(formatMoney(NUM, 'amount_no_decimals')).toBe('1,135');
  });

  it('amount_with_comma_separator', () => {
    expect(formatMoney(NUM, 'amount_with_comma_separator')).toBe('1.134,65');
  });

  it('amount_no_decimals_with_comma_separator', () => {
    expect(formatMoney(NUM, 'amount_no_decimals_with_comma_separator')).toBe('1.135');
  });

  it('amount_with_apostrophe_separator', () => {
    expect(formatMoney(NUM, 'amount_with_apostrophe_separator')).toBe("1'134.65");
  });

  it('amount_no_decimals_with_space_separator', () => {
    expect(formatMoney(NUM, 'amount_no_decimals_with_space_separator')).toBe('1 135');
  });

  it('amount_with_space_separator', () => {
    expect(formatMoney(NUM, 'amount_with_space_separator')).toBe('1 134,65');
  });

  it('amount_with_period_and_space_separator', () => {
    expect(formatMoney(NUM, 'amount_with_period_and_space_separator')).toBe('1 134.65');
  });

  it('symbol at start/end + trimming/lowercasing position', () => {
    expect(formatMoney(NUM, 'amount', { symbol: '$', position: ' start ' })).toBe('$1,134.65');
    expect(formatMoney(NUM, 'amount', { symbol: '€', position: ' END ' })).toBe('1,134.65€');
  });
});

describe('parseMoney()', () => {
  it('amount', () => {
    expect(parseMoney('1,134.65', 'amount')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals', () => {
    expect(parseMoney('1,135', 'amount_no_decimals')).toBeCloseTo(1135, 5);
  });

  it('amount_with_comma_separator', () => {
    expect(parseMoney('1.134,65', 'amount_with_comma_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals_with_comma_separator', () => {
    expect(parseMoney('1.135', 'amount_no_decimals_with_comma_separator')).toBeCloseTo(1135, 5);
  });

  it('amount_with_apostrophe_separator', () => {
    expect(parseMoney("1'134.65", 'amount_with_apostrophe_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_no_decimals_with_space_separator', () => {
    expect(parseMoney('1 135', 'amount_no_decimals_with_space_separator')).toBeCloseTo(1135, 5);
  });

  it('amount_with_space_separator', () => {
    expect(parseMoney('1 134,65', 'amount_with_space_separator')).toBeCloseTo(NUM, 2);
  });

  it('amount_with_period_and_space_separator', () => {
    expect(parseMoney('1 134.65', 'amount_with_period_and_space_separator')).toBeCloseTo(NUM, 2);
  });

  it('symbol at start/end', () => {
    expect(parseMoney('1,134.65€', 'amount')).toBeCloseTo(NUM, 2);
    expect(parseMoney('$1,134.65', 'amount')).toBeCloseTo(NUM, 2);
  });
});
