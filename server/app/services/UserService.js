const UserRepository = require("../repositories/UserRepository");
const BusinessRepository = require('../repositories/BusinessRepository');

const CustomException = require("../core/Exception/CustomException");
const authLib = require("../core/lib/auth-lib");

const User = require("../models/User");
const UserTypeConstants = require("../core/constants/UserTypeConstants");
const Business = require("../models/Business");

module.exports = class UserService {
    constructor(session) {
        this.session = session;
        this.userRepository = new UserRepository(session);
        this.businessRepository = new BusinessRepository(session);
    }

    async getAll(filters = {}) {
        return await this.userRepository.getAll(filters);
    }

    async getUserByEmail(email) {
        let filters = {
            where: {
                email: email
            }
        };
        let users = await this.userRepository.getAll(filters);
        return users && users.length ? users[0] : null;
    }

    async save(data = {}) {
        if(!data.first_name)
            throw new CustomException("Please enter first name.", 400);

        if (!data.last_name)
            throw new CustomException("Please enter last name.", 400);

        if(!data.email)
            throw new CustomException("Please enter email.", 400);

        if(!data.password)
            throw new CustomException("Please enter password.", 400);

        let first_name = data.first_name.trim();
        let last_name = data.last_name.trim();
        let email = data.email.trim();
        let plainPassword = data.password.trim();
        let business_name = data.business_name ? data.business_name.trim() : undefined;

        let _existingUser = await this.getUserByEmail(email);
        if(_existingUser)
            throw new CustomException("Email address already exists.", 400);

        let user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        let hashToken = await authLib.hashPassword(plainPassword);
        if(hashToken) {
            user.password = hashToken.hash;
        }
        user.user_type = business_name ? UserTypeConstants.BUSINESS : UserTypeConstants.TRAVELER;

        user = await this.userRepository.save(user);

        // save business record
        if(business_name) {
            let business = new Business();
            business.business_name = business_name;
            business.main_user_code = user.code;
            business = await this.businessRepository.save(business);
            if (business) {
                // update user's business_code
                user.business_code = business.code;
                await this.userRepository.updateByCode(user.code, { business_code: user.business_code });
                user.business = business;
            }
        }

        return user;
    }
}