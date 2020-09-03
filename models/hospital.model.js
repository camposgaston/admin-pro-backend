const { Schema, model } = require('mongoose');
const { collection } = require('./user.model');


const HospitalSchema = Schema({
        name: {
            type: String,
            required: true
        },
        img: {
            type: String

        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    //Rename collection example
    { collection: 'hospitales' }
);

//change JSON generated, _id for uid, no __v
HospitalSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});


module.exports = model('Hospital', HospitalSchema);