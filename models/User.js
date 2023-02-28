import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        password:{
            type: String,
            required: true,
            min: 5,
            max: 100
        },
        email:{
            type: String,
            required: true,
            max: 100,
            unique: true
        },
        phone:{
            type: String,
            required: true,
            min: 10,
            unique: true
        },
        picturePath:{
            type: String,
            default: "",
        },
        posts:{
            type: Array,
            default: []
        },
        likedPost:{
            type: Array,
            default: []
        },
        location: String,
        profileViewed:Number
    },
    { timestamps : true }
);

const User = mongoose.model("User", UserSchema);
export default User;