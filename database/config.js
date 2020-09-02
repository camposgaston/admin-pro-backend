const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false //(node:16603) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
                //without the `useFindAndModify` option set to false are deprecated.
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('error al iniciar bd, ver logs');
    }
};



module.exports = {
    dbConnection
}

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));