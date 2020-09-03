//require response from express in order to have snippets
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { jtwGenerator } = require('../helpers/jwt');


const Hospital = require('../models/hospital.model');



const getHospitals = async(req, res = response) => {

    //Filter 
    //const hospitals = await Hospital.find({}, 'name lastName email role google');

    res.json({
        ok: true,
        //array: hospitals,
        mgs: 'get hospitals works'
    });
};

const newHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        createdBy: uid,
        ...req.body
    });


    try {

        // create hospital
        await hospital.save();

        res.json({
            ok: true,
            array: hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }


};

const updateHospital = async(req, res = response) => {

    //TODO token validation and user comprobation
    const hid = req.params.id;


    try {

        const hospitalDB = await Hospital.findById(uid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Hospital con el id ingresado'
            });
        }


        //Update hospital data
        const updatedHospital = await Hospital.findByIdAndUpdate(uid, data, { new: true });

        res.json({
            ok: true,
            array: updatedHospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
};


const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Hospital delete'
    });
};


module.exports = { getHospitals, newHospital, updateHospital, deleteHospital };