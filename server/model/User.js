import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['Customer', 'Dealer', 'Admin'],
    },
    pincode : {
        type : Number,
        required : true,
    },
    address : {
        house : {
            flatNo : {
                type :Number,
                // required : true,
            },
            building : {
                type : String,
                // required : true,
            }
        },
        street : {
            type : String,
        },
        area : {
            type : String,
        },
        city : {
            type : String,
            // required : true,
        },
        state : {
            type : String,
            default : 'Maharashtra',
        },
        country : {
            type : String,
            default : 'India',
        }
    }
})

const User = mongoose.model('user', userSchema);

export default User;