const BaseRepository = require("../core/BaseRepository");

const Business = require("../models/Business");

module.exports = class BusinessRepository extends BaseRepository {
    constructor(session) {
        super(session);
        this.table = 'businesses';
    }

    /**
     * 
     * @param {any} filters 
     * @returns {Promise<Business[]>}
     */
    async getAll(filters = {}) {
        this.applyFilter(filters);

        let businesses = [];
        let records = await this.select(filters.where);
        if (records && records.length) {
            businesses = records.map(record => {
                let business = new Business(record.id, record.code, record.business_name, record.main_user_code, record.created_at, record.updated_at, record.deleted_at);
                return business;
            });
        }

        return businesses;
    }

    /**
     * 
     * @param {Business} business 
     */
    async save(business) {
        try {
            let inserted = await this.getQuery().insert({
                code: business.code,
                business_name: business.business_name,
                main_user_code: business.main_user_code,
                created_at: business.created_at,
                updated_at: business.updated_at,
                deleted_at: business.deleted_at
            }).returning(['id']);

            if (inserted && inserted.length) {
                business.id = inserted[0];
            }
            return business;
        } catch (err) {
            console.log(err);
            throw new Error("Query Error!");
        }
    }
}