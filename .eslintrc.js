
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ["plugin:vue/essential", "airbnb-base"],
    // required to lint *.vue files
    plugins: ["vue"],
    // check if imports actually resolve
    settings: {
        "import/resolver": {
            webpack: {
                config: "build/webpack.base.conf.js"
            }
        }
    },
    // add your custom rules here
    rules: {
        "no-useless-escape": 0,
        "camelcase": 0,
        "no-param-reassign": [1, { "props": false }],
        "no-mixed-operators": 0,
        "import/prefer-default-export": 0,
        "linebreak-style": ["off", "windows"],
        "max-len": [1, 200],
        "no-console": 0,
        semi: 0,
        indent: [1, 4],
        // don't require .vue extension when importing
        "import/extensions": [
            "error",
            "always",
            {
                js: "never",
                vue: "never"
            }
        ],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        "no-param-reassign": [
            "error",
            {
                props: true,
                ignorePropertyModificationsFor: [
                    "state", // for vuex state
                    "acc", // for reduce accumulators
                    "e" // for e.returnvalue
                ]
            }
        ],
        // allow optionalDependencies
        "import/no-extraneous-dependencies": [
            "error",
            {
                optionalDependencies: ["test/unit/index.js"]
            }
        ],
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
};
