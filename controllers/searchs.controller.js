//require response from express in order to have snippets
const { response } = require('express');
const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getAllSearch = async(req, res = response) => {

    const search = req.params.search;
    const regexp = new RegExp(search, 'i');


    const [users, doctors, hospitals] = await Promise.all([
        User.find({
            $or: [
                { name: regexp },
                { lastName: regexp }
            ]
        }),
        Doctor.find({ name: regexp }),
        Hospital.find({ name: regexp })
    ]);
    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });
};

module.exports = {
    getAllSearch
};