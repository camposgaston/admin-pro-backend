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

const getCollectionSearch = async(req, res = response) => {

    const search = req.params.search;
    const collection = req.params.collection;
    const regexp = new RegExp(search, 'i');

    let data = [];

    switch (collection) {
        case 'doctors':
            data = await Doctor.find({ name: regexp })
                .populate('createdBy', 'name lastName img')
                .populate('hospital', 'name img');
            break;

        case 'users':
            data = await User.find({ $or: [{ name: regexp }, { lastName: regexp }] });
            break;

        case 'hospitales':
            data = await Hospital.find({ name: regexp })
                .populate('createdBy', 'name lastName img');
            break;

        default:

            return res.status(400).json({
                ok: false,
                msg: `La tabla ${collection} no existe`
            })
    }

    res.json({
        ok: true,
        result: data
    });

};

module.exports = {
    getAllSearch,
    getCollectionSearch
};