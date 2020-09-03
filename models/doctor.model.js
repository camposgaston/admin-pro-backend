const { Schema, model } = require('mongoose');


const DoctorSchema = Schema({
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
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

//change JSON generated, _id for uid, no __v
DoctorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.did = _id;
    return object;
});


module.exports = model('Doctor', DoctorSchema);