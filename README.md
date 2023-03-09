# dweb-search-frontend

[![Pipeline Status](https://gitlab.com/ipfs-search.com/dweb-search-frontend/badges/master/pipeline.svg)](https://gitlab.com/ipfs-search.com/dweb-search-frontend/-/commits/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/1373bd46347115e764d2/maintainability)](https://codeclimate.com/github/ipfs-search/dweb-search-frontend/maintainability)
[![Backers on Open Collective](https://opencollective.com/ipfs-search/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/ipfs-search/sponsors/badge.svg)](#sponsors)

New frontend repository for [ipfs-search.com](https://ipfs-search.com). Master is automatically deployed through [Fleek](https://fleek.co/).

## Dependencies

- [NodeJS 16 Gallium (LTS)](https://nodejs.org/)
- [Vue 3](https://vuejs.org/)
- [VuetifyJS 3 (beta)](https://next.vuetifyjs.com/)

## Project setup

```
npm install
```

## Scripts:

`npm run serve` Compiles and hot-reloads for development

`npm run build` Compiles and minifies for production

`npm run preview` Serves the latest build locally

`npm run test:watch` Run all tests and watch code

`npm run test` Run all tests only once

`npm run test:coverage` Run all tests once and create coverage report under './coverage'

`npm run lint` Run code through linter to check

`npm run lint:fix` Run code through linter and fix (if automatically possible)

`npm run prettier:check` Test if code is formatted according to prettier spec

`npm run prettier:write` Format code according to prettier spec

`npm run prepare-githooks` Setup githook to automatically run prettier pre-commit. If you like this.

### So many scripts... which one do I need?

Developers: you will likely want to run `npm run serve` in one terminal and `npm run test:watch` in another. You can use `npm run prepare-githooks` to autoformat the code. Alternatively you can run `npm run prettier:write` before pushing.

Ops will want to use `npm run build`, `npm run test` or `npm run test:coverage`, `npm run prettier:check`

## query parameters
- `q`, which is forwarded to the [ipfs-search API](https://app.swaggerhub.com/apis-docs/ipfs-search/ipfs-search/1.0.2#/default/get_search), along with filter selections. 
- Filter query parameters. The applicable filters are defined in `store/modules/queryFilters/`.

Besides this, there is are special flags:
- `nativeIpfs=true` will make ipfs links direct to `ipfs://` rather than a gateway.

## NSFW api

This build uses an API to check nsfw content.

The default API endpoint to is: https://api.ipfs-search.com/v1/nsfw/classify/
. This can be overridden by injecting environment variable `VITE_NSFW_API`

The API call simply pass the CID, so e.g.

https://api.ipfs-search.com/v1/nsfw/classify/<CID>
