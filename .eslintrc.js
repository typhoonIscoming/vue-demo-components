
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true
    },
    // ecmaVersion: 6,
    ecmaFeatures: {
        "modules": false
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
        "consistent-return": 0,
        "array-callback-return": 0,
        "no-underscore-dangle": 0,
        "radix": 0,
        "no-param-reassign": 0,
        "no-useless-escape": 0,
        "camelcase": 1,
        "no-mixed-operators": 0,
        "import/prefer-default-export": 0,
        "linebreak-style": ["off", "windows"],
        "max-len": [1, 200],
        "no-console": 0,
        "semi": 0,
        "indent": [0, 4, {
            'SwitchCase': 1
        }],
        // don't require .vue extension when importing
        "import/extensions": [
            "off",
            "always",
            {
                js: "never",
                vue: "never"
            }
        ],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        // "no-param-reassign": [
        //     "warn",
        //     {
        //         props: true,
        //         ignorePropertyModificationsFor: [
        //             "state", // for vuex state
        //             "total", // for reduce accumulators
        //             "e" // for e.returnvalue
        //         ]
        //     }
        // ],
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
