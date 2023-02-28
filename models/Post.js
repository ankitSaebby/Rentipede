import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
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
        post:{
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
// {_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views}
const Post = mongoose.model("Post", PostSchema);
export default Post;