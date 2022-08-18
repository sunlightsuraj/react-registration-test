"use strict"
const CustomException = require("../core/Exception/CustomException");
const UserService = require("../services/UserService");

module.exports = {
    index: async (req, res, next) => {

    },

    show: async (req, res, next) => {

    },

    save: async (req, res, next) => {
        let userService = new UserService();    
        let data = req.body;
        try {
            let user = await userService.save(data);
            if(!user)
                throw new CustomException("Somethign went wrong.", 500);

            user.removePasswordField();

            return res.status(201).json({status: 'ok', user: user });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({ status: 'fail', message: err.message || err });
        }
    },

    update: async (req, res, next) => {

    },

    delete: async (req, res, next) => {

    }
}