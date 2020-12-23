# demo-components

> prictise for vue

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```javascript
"devDependencies": {
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "husky": "^4.3.0",
    "lint-staged": "^10.5.0",
}
"husky": {
        "hooks": {
            "pre-commit": "npm run lint:staged"
        }
    },
    "lint-staged": {
        "src/**/*.js": "eslint --ext .js",
        "src/**/*.vue": "eslint --ext .vue"
    }
}
```
