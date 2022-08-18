"use strict"

module.exports = {
    index: async(req, res) => {
        return res.status(200).json({
            status: 'ok',
            posts: {
                data: [
                    {
                        id: 1,
                        post: 'hello'
                    },
                    {
                        id: 2,
                        post: 'Hi'
                    }
                ]
            }
        });
    }
}