const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

const Session = require("../core/models/Session");

const authLib = require("../core/lib/auth-lib");

router.get('/', (req, res, next) => {
    var token = req.headers['authorization'];
    if(!token)
        return res.sendStatus(401);
    token = token.split(' ');
    token = token[1];
    console.log(token);
    authLib.verifyAuthToken(token, (err, data) => {
        if(err) return res.sendStatus(401);
        console.log(data);
        const session = new Session();
        session.user_id = data.user_id;
        session.first_name = data.first_name;
        session.last_name = data.last_name;
        session.email = data.email;
        req.session = session;

        next();
    })
}, postController.index);

module.exports = router;