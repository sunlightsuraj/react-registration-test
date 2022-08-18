"use strict"
const authRouter = require("./auth");
const usersRouter = require('./users');
const postsRouter = require('./posts');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
}