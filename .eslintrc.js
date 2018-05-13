module.exports = {
  "extends": "airbnb",
  "env": {
    "mocha": true
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  },
};
