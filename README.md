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

`npm run test` Run all tests and watch code

`npm run test:once` Run all tests only once

`npm run test:coverage` Run all tests once and create coverage report under './coverage'

`npm run lint` Run code through linter to check

`npm run lint:fix` Run code through linter and fix (if automatically possible)

`npm run prettier:check` Test if code is formatted according to prettier spec

`npm run prettier:write` Format code according to prettier spec

`npm run prepare-githooks` Setup githook to automatically run prettier pre-commit. If you like this.

### So many scripts... which one do I need?

Developers: you will likely want to run `npm run serve` in one terminal and `npm run test` in another. You can use `npm run prepare-githooks` to autoformat the code. Alternatively you can run `npm run prettier:write` before pushing.

Ops will want to use `npm run build`, `npm run test` or `npm run test:coverage`, `npm run prettier:check`

## Configuration

The following environment variables may be used to configure the frontend.

### Variables

- `VITE_IPFS_GATEWAY`: Default gateway for URL generation. Default: `https://dweb.link`
- `VITE_NSFW_API`: Endpoint for [nsfw-server](https://github.com/ipfs-search/nsfw-server). Default: `https://api.ipfs-search.com/v1/nsfw/classify/`
- `VITE_NYATS_API`: Endpoint for [nyats](https://github.com/ipfs-search/nyats) (Not Yet Another Thumbnail Server) API. Default: `https://api.ipfs-search.com/v1/thumbnail/`
- `VITE_NYATS_IPNS_ROOT`: Root for thumbnails over IPNS. Default: `https://gateway.ipfs.io/ipns/12D3KooWPVobDRG9Mdmact3ejSe6UAFP8cevmw35HHR1ZDwCozSo/`
