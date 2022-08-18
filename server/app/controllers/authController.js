"use strict"
const AuthService = require("../services/AuthService");
const Session = require("../core/models/Session");

module.exports = {
    login: async (req, res) => {
        try {
            const body = req.body;
            const authService = new AuthService();
            const email = body.email;
            const password = body.password;
            const tokens = await authService.login(email, password);
            if (tokens)
                return res
                    .cookie('refreshToken', tokens.refreshToken, { httpOnly: true}).status(200)
                    .json({ status: 'ok', token: tokens.token, refreshToken: tokens.refreshToken, user: tokens.user });
        } catch (err) {
            console.error(err);
            return res.status(err.status || 403).json({ status: 'fail', message: err.message || "Login failed." });
        }

        return res.status(403).json({ status: 'fail', message: "Invalid login credentials." });
    },

    refreshToken: async (req, res) => {
        try {
            const authService = new AuthService();
            const refreshToken = req.body.refreshToken;

            authService.refreshToken(refreshToken, (tokens) => {
                if (tokens) {
                    return res
                            .cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
                            .status(200).status(200).json({ status: 'ok', token: tokens.token, refreshToken: tokens.refreshToken });
                } else {
                    return res.sendStatus(403);
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(err.status || 403).json({ status: 'fail', message: err.message || 'Forbidden' })
        }
    }
}
