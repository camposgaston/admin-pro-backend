const User = require('../models/user.model')


const getUsers = (req, res) => {
    res.json({
        ok: true,
        msg: 'get users'
    });
};

const newUser = async(req, res) => {

    const { email, password, name, lastName } = req.body;

    const user = new User(req.body);

    try {
        await user.save();
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        console.log('That did not go well.')
        throw error
    }


};

module.exports = { getUsers, newUser };