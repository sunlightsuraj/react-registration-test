"use strict"
const crypto = require('crypto');

module.exports = class Business {
    constructor(id = undefined, code = this.generateCode(), business_name = null, main_user_code = null,
        created_at = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.business_name = business_name;
        this.main_user_code = main_user_code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    setCode() {
        this.code = this.generateCode();
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Business.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }
}