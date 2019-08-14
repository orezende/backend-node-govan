const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bithDay:{
        type: Date, 
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports  = model("User", UserSchema);