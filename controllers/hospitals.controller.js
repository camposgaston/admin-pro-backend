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

    const hid = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDB = await Hospital.findById(hid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Hospital con el id ingresado: ' + hid
            });
        }

        const updateHospitalData = {
            ...req.body,
            createdBy: uid
        }

        //Update hospital data
        const updatedHospital = await Hospital.findByIdAndUpdate(hid, updateHospitalData, { new: true });

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


const deleteHospital = async(req, res = response) => {

    const hid = req.params.id;


    try {
        const hospitalDB = await Hospital.findById(hid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Hospital con el id ingresado: ' + hid
            });
        }

        await Hospital.findByIdAndDelete(hid);


        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
};


module.exports = { getHospitals, newHospital, updateHospital, deleteHospital };