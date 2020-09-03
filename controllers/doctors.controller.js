//require response from express in order to have snippets
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { jtwGenerator } = require('../helpers/jwt');


const Doctor = require('../models/doctor.model');



const getDoctors = async(req, res = response) => {

    //Filter 
    // const doctors = await Doctor.find({}, 'name lastName email role google');

    res.json({
        ok: true,
        // array: doctors,
        mgs: 'get doctors works'
    });
};

const newDoctor = async(req, res = response) => {

    // const { email, password } = req.body;

    try {

        const doctor = new Doctor(req.body);


        // create doctor
        await doctor.save();

        res.json({
            ok: true,
            array: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }


};

const updateDoctor = async(req, res = response) => {

    //TODO token validation and user comprobation
    const uid = req.params.id;


    try {

        const doctorDB = await Doctor.findById(uid);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Doctor con el id ingresado'
            });
        }


        //Update doctor data
        const updatedDoctor = await Doctor.findByIdAndUpdate(uid, data, { new: true });

        res.json({
            ok: true,
            array: updatedDoctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
};


const deleteDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Doctor delete'
    });
};


module.exports = { getDoctors, newDoctor, updateDoctor, deleteDoctor };