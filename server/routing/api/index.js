const loadPathsIntoRouter = require("@/utils/loadPathsIntoRouter");
const notFound = require("./notFound");

const routes = [
    ["*", notFound]
];

module.exports = loadPathsIntoRouter(routes);