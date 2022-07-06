<!-- 
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@mathijsfietst.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->


# dweb-search-frontend
[![Pipeline Status](https://gitlab.com/ipfs-search.com/dweb-search-frontend/badges/master/pipeline.svg)](https://gitlab.com/ipfs-search.com/dweb-search-frontend/-/commits/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/1373bd46347115e764d2/maintainability)](https://codeclimate.com/github/ipfs-search/dweb-search-frontend/maintainability)
[![Backers on Open Collective](https://opencollective.com/ipfs-search/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/ipfs-search/sponsors/badge.svg)](#sponsors)

New frontend repository for [ipfs-search.com](https://ipfs-search.com). Master is automatically deployed through [Fleek](https://fleek.co/).

## Dependencies
* [NodeJS 16 Gallium (LTS)](https://nodejs.org/)
* [VueJS](https://vuejs.org/)
* [VuetifyJS](https://vuetifyjs.com/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## NSFW api
This build uses an API to check nsfw content. 

The default API endpoint to is: https://api.ipfs-search.com/nsfw/
. This can be overridden by injecting `process.env.NSFW_API` 

The API call should be: `<process.env.NSFW_API><CID>`, so e.g.

`https://api.ipfs-search.com/nsfw/QmSZzv7ux1LGwpehVcCMQ9ec945X6qE4qyjKDhCVwY25iw`
https://api.ipfs-search.com/v1/nsfw/classify/
