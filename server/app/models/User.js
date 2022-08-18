"use strict"
const crypto = require("crypto");
const Business = require("./Business");

module.exports = class User {
    constructor(id = undefined, code = this.generateCode(), first_name = null, last_name = null, email = null,
                password = null, user_type = null, business_code = null,
                created_at = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.user_type = user_type;
        this.business_code = business_code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

        /**
         * @type {Business}
         */
        this.business = undefined;
    }

    removePasswordField() {
        this.password = undefined;
    }

    setCode() {
        this.code = this.generateCode();
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(User.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }
}