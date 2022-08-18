module.exports = class Session {
    constructor() {
        /**
         * @type number
         */
        this.user_id = undefined;

        /**
         * @type string
         */
        this.first_name = undefined;

        /**
         * @type string
         */
        this.last_name = undefined;

        /**
         * @type string
         */
        this.email = undefined;
    }
}
