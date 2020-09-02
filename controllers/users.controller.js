const User = require('../models/user.model')


const getUsers = async(req, res) => {

    //Filter 
    const users = await User.find({}, 'name lastName email role google');

    res.json({
        ok: true,
        users
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