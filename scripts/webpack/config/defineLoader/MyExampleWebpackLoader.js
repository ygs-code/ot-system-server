const { getOptions } = require("loader-utils");

module.exports = function (source) {
    const callback = this.async();
    const options = getOptions(this);
    const { name } = options;
  callback(null, source);
};
