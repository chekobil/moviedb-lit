## Development

Clone the repo, install the dependencies, create then .env file and then start the project in dev mode

```js
// choose your package manager
npm run dev
pnpm run dev
bun dev
```

An API-KEY from [TMDB](developer.themoviedb.org) is required to exist in an .env file with the name VITE_MOVIEDB_API_KEY

```
VITE_MOVIEDB_API_KEY="your-api-key"
```

## Styles

Thanks to [postcss-preset-env plugin](https://github.com/csstools/postcss-plugins), styles can be written with future-css syntax, like nesting, etc...
