//require response from express in order to have snippets
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImgDb } = require('../helpers/updateImg')

const fileUpload = async(req, res = response) => {

    const { collection, id } = req.params;

    // collection validation
    const allowedCollections = ['hospitals', 'users', 'doctors'];
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: collection + ' No es un medico ni usuario ni hospital'
        });
    }

    // File exist validation
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: ' No se recibio archivo'
        });
    }

    // img processing...
    const file = req.files.image;

    const splitName = file.name.split('.');
    const extensionFile = splitName[splitName.length - 1];

    //extension validation
    const allowedExtension = ['png', 'jpg', 'gif', 'jpeg'];
    if (!allowedExtension.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: extensionFile + 'No es un tipo de archivo permitido, solo imagenes'
        });
    }

    // File Name Generator
    const fileName = `${uuidv4()}.${extensionFile}`;

    // Image path
    const path = `./uploads/${collection}/${fileName}`;

    // If ID exist, update DB
    const updateDbById = await updateImgDb(collection, id, fileName);

    if (!updateDbById) {
        return res.status(400).json({
            ok: false,
            msg: `El id:${id} no pertenece a ningun usuario ni medico ni hospital, operacion cancelada`
        });
    }

    // mv() method to place the file 
    file.mv(path, (err) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        res.json({
            ok: true,
            msg: `File uploaded to collection:${collection} id:${id} fileName:${file.name} fileNewName:${fileName}`
        })
    });





};


module.exports = {
    fileUpload
};