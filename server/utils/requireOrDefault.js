module.exports = (path, def) => {
    try {
        return require(path);
    } catch (e) {
        return def;
    }
}