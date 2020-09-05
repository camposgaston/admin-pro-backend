const fs = require('fs');

const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const eraseImg = (oldPath) => {
    if (fs.existsSync(oldPath)) {
        //Borra la imagen anterior
        fs.unlinkSync(oldPath);
    }
}

const updateImgDb = async(collection, id, fileName) => {

    let oldPath = '';

    switch (collection) {
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log(`El id ${id} no pertenece a ningun hospital`);
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            eraseImg(oldPath);

            hospital.img = fileName;
            await hospital.save();
            return true;

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log(`El id ${id} no pertenece a ningun usuario`);
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            eraseImg(oldPath);

            user.img = fileName;
            await user.save();
            return true;
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log(`El id ${id} no pertenece a ningun medico`);
                return false;
            }

            oldPath = `./uploads/doctors/${doctor.img}`;
            eraseImg(oldPath);

            doctor.img = fileName;
            await doctor.save();
            return true;
    }
};

module.exports = {
    updateImgDb
}