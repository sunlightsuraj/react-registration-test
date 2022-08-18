const knex = require("./database/database");
const filter = require("knex-filter").filter;

module.exports = class BaseRepository {
    constructor(session) {
        this.session = session;
        this.table = null;

        this.all = false;
        this.trashed = false;
        this.page = 1;
        this.per_page = 50;
        this.offset = (this.page - 1) * this.per_page;
        this.order_by = ['created_at', 'desc'];
    }

    applyFilter(filters = {}) {
        if (filters.all && filters.all === true)
            this.all = true;
        if (filters.trashed && filters.trashed === true)
            this.trashed = true;

        if (filters.page && parseInt(filters.page) > 0)
            this.page = parseInt(filters.page);
        if (filters.per_page && parseInt(filters.per_page) > 0)
            this.per_page = parseInt(filters.per_page);
        if (filters.order_by && filters.order_by != '')
            this.order_by = [filters.order_by.key || 'created_at', filters.order_by.order || 'desc'];

        this.offset = (this.page - 1) * this.per_page;
    }

    getQuery() {
        return knex(this.table);
    }


    /**
     * 
     * @param {any} filters 
     * @returns {Promise<any[]>}
     */
    async select(filters = {}) {
        try {
            let records = [];
            let query = this.getQuery().where(filter(filters));
            if(!this.trashed) {
                query = query.whereNull("deleted_at");
            }
            if(!this.all) {
                records = await query.limit(this.per_page).offset(this.offset);
            } else {
                records = await query.select();
            }

            return records;
        } catch (err) {
            console.log(err);
            throw new Error("Query Error!");
        }
    }
}