# Deposit Calculator

Compare bank deposits with compound or simple interest, tax, and monthly contributions. Save scenarios, undo changes, switch language (EN / UK) and theme.

**[Live demo](https://ekashpersky.github.io/deposit-calculator/)**

> It is an estimate of future deposits, not financial advice.

## Stack

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![Angular Material](https://img.shields.io/badge/Angular%20Material-22-757575?logo=angular&logoColor=white)](https://material.angular.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![ngx-translate](https://img.shields.io/badge/ngx--translate-18-4B8BBE?logo=i18next&logoColor=white)](https://ngx-translate.org)

---

## What it does
- Calculates simple and compound interest
- Allows to manage monthly top-ups, first month skip
- Tax on interest (on/off, rate)
- Dashboard of created deposits (stored in the browser)
- Currency switcher with rates

## Features
- Dashboard actions history with undo/redo shortcuts
- Currency, language and theme switchers
- Animated currency amounts

---

## How interest is calculated

The model takes principal, annual rate, term, compounding frequency, monthly deposit, tax rate, and two flags (taxed, skip first-month deposit).

- **Simple** — interest is not added back to the principal. Each contribution earns simple interest for the remaining months.
- **Compound** — the annual rate is converted to an effective monthly rate from the chosen frequency, then applied over the term with contributions.

Output: total deposited, gross interest, tax, net future value.

---

## Author
Yehor Kashperskyi

[LinkedIn](https://linkedin.com/in/ekashpersky)