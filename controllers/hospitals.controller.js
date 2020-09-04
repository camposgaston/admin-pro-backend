//require response from express in order to have snippets
const { response } = require('express');

const Hospital = require('../models/hospital.model');



const getHospitals = async(req, res = response) => {

    //find hospitals and populate user data 
    const hospitals = await Hospital.find()
        .populate('createdBy', 'name lastName img');

    res.json({
        ok: true,
        hospitals
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
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            array: hospitalDB
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