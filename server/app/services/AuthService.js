const UserService = require("./UserService");

const authLib = require("../core/lib/auth-lib");

const CustomException = require("../core/Exception/CustomException");

module.exports = class AuthService {
    constructor(session) {
        this.userService = new UserService(session);
    }

    async login(email, password) {
        if(!email) {
            throw new CustomException("Invalid email addres.", 400);
        }
        if (!password) {
            throw new CustomException("Invalid password.", 400);
        }
        email = email.trim();
        password = password.trim();

        // check user credentials
        let user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new CustomException('Invalid email address.', 401);
        }

        // validate user credentials
        // let checkingHash = await authLib.hashPassword(password);
        let hashCheck = await authLib.comparePasswordHash(password, user.password);
        if (hashCheck) {
            // generate JWT token
            let tokens = authLib.generateAuthToken({
                user_id: user.id,
                user_code: user.code,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            });

            // send JWT token back to user
            user.removePasswordField();
            return {
                token: tokens.token,
                refreshToken: tokens.refreshToken,
                user: user
            };
        } else {
            throw new CustomException("Invalid login credentials.", 401);
        }

        return null;
    }

    refreshToken(refreshToken, callback) {
        // validate refresh token
        authLib.verifyRefreshToken(refreshToken, (err, data) => {
            if (err) {
                throw new CustomException("Invalid refresh token.", 403);
            }

            // generate new JWT tokens
            let tokens = authLib.generateAuthToken({
                user_id: data.user_id,
                user_code: data.user_code,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            });

            // send new JWT tokens back to user
            callback(tokens)
        })
    }
}
