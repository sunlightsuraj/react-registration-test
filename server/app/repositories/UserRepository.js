const BaseRepository = require("../core/BaseRepository");

const User = require("../models/User");

module.exports = class UserRepository extends BaseRepository {
    constructor(session) {
        super(session);
        this.table = 'users';
    }

    /**
     * 
     * @param {any} filters 
     * @returns {Promise<User[]>}
     */
    async getAll(filters = {}) {
        this.applyFilter(filters);
        
        let users = [];
        let records = await this.select(filters.where);
        if(records && records.length) {
            users = records.map(record => {
                let user = new User(record.id, record.code, record.first_name, record.last_name, record.email, record.password, record.user_type, record.business_code, record.created_at, record.updated_at, record.deleted_at);
                return user;
            });
        }

        return users;
    }

    /**
     * 
     * @param {User} user 
     */
    async save(user) {
        try {
            let inserted = await this.getQuery().insert({
                code: user.code,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                user_type: user.user_type,
                business_code: user.business_code,
                created_at: user.created_at,
                updated_at: user.updated_at,
                deleted_at: user.deleted_at
            }).returning(['id']);

            if(inserted && inserted.length) {
                user.id = inserted[0];
            }
            return user;
        } catch (err) {
            console.log(err);
            throw new Error("Query Error!");
        }
    }

    /**
     * 
     * @param {string} code 
     * @param {any} params 
     * @returns {Promise<boolean>} boolean
     */
    async updateByCode(code, params = {}) {
        if(Object.keys(params).length) {
            params.updated_at = new Date();
            try {
                let updated = await this.getQuery().where({code: code}).update(params);
                return updated ? true : false;
            } catch (err) {
                console.log(err);
                throw new Error("Query Error!");
            }
        }
        return false;
    }
}