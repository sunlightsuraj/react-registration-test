"use strict"
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    hashPassword: async (plainPassword) => {
        const salt = bcrypt.genSaltSync(saltRounds);

        const hash = bcrypt.hashSync(plainPassword, salt);

        return {
            'salt': salt,
            'hash': hash
        };
    },

    comparePasswordHash: async (password, hash) => {
        const matched = bcrypt.compareSync(password, hash);
        return matched;
    },

    generateAuthToken: (payload = {}) => {
        if (!Object.keys(payload).length)
            throw new CustomException("Data is empty to generate authentication token.", 403);

        let token = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: '10m' });
        let refreshToken = jwt.sign(payload, process.env.AUTH_REFRESH_TOKEN_SECRET, { expiresIn: '20m' });

        return {
            token: token,
            refreshToken: refreshToken
        }
    },

    verifyAuthToken: (token, callback) => {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, callback);
    },

    verifyRefreshToken: (refreshToken, callback) => {
        jwt.verify(refreshToken, process.env.AUTH_REFRESH_TOKEN_SECRET, callback);
    }
}
