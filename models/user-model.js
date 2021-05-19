const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserScheama = new mongoose.Schema({
    email : { type : String , required : true },
    password : { type : String, required : true }
})


UserScheama.pre('save', async function(next) {
    if (this.isNew) {
        this.password  = await bcrypt.hash(this.password, 10);
    }
})

UserScheama.methods.isValidPassword = async function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', UserScheama , 'users');