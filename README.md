# numberformat.app &nbsp;![Vercel Deploy](https://deploy-badge.vercel.app/vercel/number-format-jakeisonlines-projects) ![Built on next.js](https://img.shields.io/github/package-json/dependency-version/jakeisonline/number-format/next)

[numberformat.app](https://numberformat.app) is a tiny web-based tool that helps you visualise the various number formats of almost every locale. Every language and locale has its own special rules when it comes to number formatting, such as the symbol used for decimal points, or how numberical dates are displayed.

## Features

- Shows examples and rules for number formatting, date and time formatting (including relative), currencies formatting, and measures formatting
- Easily lookup any language or locale currently supported by the ECMAScript Internationalization API
- Feeling lucky? Randomly select a locale to take a look at
- Automatically detects your current browser's locale
- Dark mode to help those midnight formatting sessions

## How this app works

This app make extensive use of the [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) JavaScript global object in order to display the various number formats of the app. This magical object makes string formatting for number, date, and time formatting a breeze.

It also means this app runs without any database, instead relying on your browser almost entirely to render the formatting examples.
