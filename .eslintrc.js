module.exports = {
  "env": {
      "node": true,
      "browser": true,
      "es6": true
  },
  "extends": ["eslint:recommended", "airbnb"],
  "parser": "babel-eslint",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true,
          "tsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "ts", "tsx"] }]
  },
  "settings": {
    "import/resolver": webpack
  }
};
