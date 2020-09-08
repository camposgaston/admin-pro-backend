//require response from express in order to have snippets
const { response } = require('express');

const Doctor = require('../models/doctor.model');



const getDoctors = async(req, res = response) => {

    //find doctors and populate user and hospital data 
    const doctors = await Doctor.find()
        .populate('createdBy', 'name lastName img')
        .populate('hospital', 'name img');

    res.json({
        ok: true,
        doctors
    });
};

const newDoctor = async(req, res = response) => {

    // const { hospital } = req.body;

    const uid = req.uid;
    const doctor = new Doctor({
        createdBy: uid,
        ...req.body
    });

    try {
        // create doctor
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            array: doctorDB
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

    const did = req.params.id;
    const uid = req.uid;


    try {

        const doctorDB = await Doctor.findById(did);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Doctor con el id ingresado'
            });
        }


        const updatedDoctorData = {
            ...req.body,
            createdBy: uid
        }

        //Update doctor data
        const updatedDoctor = await Doctor.findByIdAndUpdate(did, updatedDoctorData, { new: true });

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


const deleteDoctor = async(req, res = response) => {

    const did = req.params.id;


    try {
        const doctorDB = await Doctor.findById(did);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Medico con el id ingresado: ' + did
            });
        }

        await Doctor.findByIdAndDelete(did);


        res.json({
            ok: true,
            msg: 'Doctor Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500 al eliminar'
        });
    }
};


module.exports = { getDoctors, newDoctor, updateDoctor, deleteDoctor };