# Diminshing Permutations of a Set

How to calculate the number of diminishing permutations of a set in a way that doesn't explode your computer. It uses the following equation:

```math
⌊(n! * e)⌋ - 1
```

<p align="center">
<a href="https://docs.google.com/spreadsheets/d/1rBLwVjB6dwehYyHy3xBZOJ4XwVe46dqmzkIjNURyngU/edit?usp=sharing">See the breakdown of how it works on Google Sheets!</a><br/>
<img src="https://i.imgur.com/POhhPp4.png" width="100" height="100">
</p>

## Install

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hypercrowd/diminshing-permutations)

```bash
git clone https://github.com/HyperCrowd/diminshing-permutations.git
cd diminshing-permutations
yarn test
```

## CLI

### npm

- `npm run build`: Builds the source TypeScript to CommonJS, ESM, and IIFE JavaScript files in [`dist`](dist)
- `npm run sb-watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (StackBlitz-friendly)
- `npm run watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (Every other system)
- `npm test`: Runs tests.

### yarn

- `yarn build`: Builds the source TypeScript to CommonJS, ESM, and IIFE JavaScript files in [`dist`](dist)
- `yarn sb-watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (StackBlitz-friendly)
- `yarn watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (Every other system)
- `yarn test`: Runs tests.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/psysecgroup-typescript-server-template-6q9pvr)
