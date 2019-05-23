module.exports = { 
    isDev: process.env.NODE_ENV !== "production",
    envName: process.env.NODE_ENV || "development"
};