import {parser} from "./parser";
import {scanner} from "./scanner";

export default scanner;
export {parser};

// Backwards compatibility for commonjs
module.exports = scanner;
module.exports.parser = parser;
