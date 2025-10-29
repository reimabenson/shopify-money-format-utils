# 🛍️ Shopify Money Format Utils

**Shopify Money Format Utils** is a lightweight JavaScript library for **Shopify theme developers** to format and parse money values exactly like Shopify Liquid’s `money` filters`.  

Supports **multi-currency**, **locale-aware separators**, and **custom currency symbols** — perfect for global Shopify themes.

---

## 🚀 Features

- 🧮 Shopify-style money formatting (`amount`, `amount_no_decimals`, etc.)
- 💱 Multi-currency ready with symbol + position control
- 🌍 Locale-aware separators for EN / DE / FR / CH
- 🔄 Parses formatted strings back into numeric values
- 🪶 Zero dependencies — works in browser or Node

---

## 📦 Installation

```bash
npm install shopify-money-format-utils
# or
pnpm add shopify-money-format-utils
```

---

## 🧰 Usage

```js
import { formatMoney, parseMoney } from 'shopify-money-format-utils';

// Format
formatMoney(1134.65, 'amount'); 
// → "1,134.65"

// Format with symbol and position
formatMoney(1134.65, 'amount', { symbol: '$', position: 'start' }); 
// → "$1,134.65"

formatMoney(1134.65, 'amount_with_space_separator', { symbol: '€', position: 'end' }); 
// → "1 134,65€"

// Parse formatted string back to number
parseMoney('1.134,65', 'amount_with_comma_separator'); 
// → 1134.65

// Remove Currency Symbol
parseMoney('€1.134,65', 'amount_with_comma_separator'); 
// → 1134.65
```

---

## 📊 Format Reference (Examples)

| **Format Parameter** | **Example Formatted Output** | **Parsed Output (number)** | **Locale / Style** |
|----------------------|------------------------------|-----------------------------|--------------------|
| `amount` | `1,134.65` | 1134.65 | en-US (default, 2 decimals) |
| `amount_no_decimals` | `1,135` | 1135 | en-US (rounded, no decimals) |
| `amount_with_comma_separator` | `1.134,65` | 1134.65 | de-DE (comma as decimal) |
| `amount_no_decimals_with_comma_separator` | `1.135` | 1135 | de-DE (no decimals) |
| `amount_with_apostrophe_separator` | `1'134.65` | 1134.65 | de-CH (Switzerland) |
| `amount_no_decimals_with_space_separator` | `1 135` | 1135 | fr-FR (space separator) |
| `amount_with_space_separator` | `1 134,65` | 1134.65 | fr-FR (space + comma decimal) |
| `amount_with_period_and_space_separator` | `1 134.65` | 1134.65 | Custom (period decimal, space thousand) |

> Note: Output is normalized to avoid non‑breaking/narrow spaces and smart apostrophes across environments.

---

## 💡 Shopify Theme Integration

To make JavaScript aware of your Shopify store’s money format and currency, copy this script in your `theme.liquid` file:

```liquid
<script>
  if (!window.$shopify) { 
    window.$shopify = {};
  }
  window.$shopify.moneyFormat = String({{ shop.money_format | json }}).match(/\{\{\s*([^}]+?)\s*\}\}/)[1];
  window.$shopify.currencySymbol = `{{ cart.currency.symbol }}`;
</script>
```

Then use in JS:

```js
const format = window.$shopify.moneyFormat;
const symbol = window.$shopify.currencySymbol;

formatMoney(1134.65, format, { symbol, position: 'start' });
```

---

## 🧩 Options

| Option | Type | Default | Description |
|--------|------|----------|-------------|
| `format` | `string` | `"amount"` | Shopify-like money format (case-insensitive) |
| `symbol` | `string` | `""` | Currency symbol (e.g. `$`, `€`, `¥`) |
| `position` | `"start"` or `"end"` | `"start"` | Symbol placement; trimmed & lowercased automatically |

---

## 🔧 Development

```bash
pnpm i
pnpm run build      # builds ESM + CJS + types to dist/
pnpm run typecheck  # TypeScript type checking (no emit)
```

### 🧪 Testing

- Unit tests live in `src/**/*.test.ts` (and/or `tests/**/*.test.ts`).
- We also ship a **dist-entry test** that imports the package by name to verify the `exports` map.

Run all tests:
```bash
pnpm run test
```

Watch mode:
```bash
pnpm run test:watch
```

Coverage:
```bash
pnpm run test:cov
```

**Dist-entry test (builds first, then runs only that test):**
```bash
pnpm run test:dist
```

---

## 🔍 Keywords (SEO)

> **Shopify money format**, **Shopify currency parser**, **multi-currency theme utils**,  
> **Shopify money JavaScript**, **Shopify Liquid JS equivalent**, **Shopify multi-currency formatting**,  
> **Shopify frontend utilities**, **Shopify theme development helper**

---

## 📄 License
MIT © 2025 Reima
