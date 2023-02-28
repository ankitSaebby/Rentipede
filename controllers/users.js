import User from "../models/User.js";
import Post from "../models/Post.js";

/* Read */

export const getUsers = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({ message : err.message})
    }
}

export const getUserPosts = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const posts = await Promise.all(
            user.posts.map((id) => User.findById(id))
        );
        const formattedPosts = posts.map(
            ({_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views}) => {
                return {_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views};
            }
        );
        res.status(200).json(formattedPosts);

    } catch(err){
        res.status(404).json({ message : err.message });
    }
}

/* Update  */

// TODO: to changed to delete route 
export const addRemovePost = async (req, res) => {
    try{
        const { id, postId } = req.params;
        const user = await User.findById(id);
        
        //TODO: o be fetched from Posts model
        const post = await Post.findById(postId);

        if(user.posts.includes(postId)){
            user.posts = user.posts.filter((id) => id !== postId)
        }
        await user.save();

        const posts = await Promise.all(
            user.posts.map((id) => User.findById(id))
        );
        const formattedPosts = posts.map(
            ({_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views}) => {
                return {_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views};
            }
        );
        res.status(200).json(formattedPosts);

    } catch(err){
        res.status(404).json({ message : err.message });
    }
}

/* Delete */
export const deletePost = async (req,res) => {
    try{
        const { id, postId } = req.params;
        const user = await User.findById(id);
        const post = await Post.findById(postId);

        if(user.posts.includes(postId)){
            user.posts = user.posts.filter((id) => id !== postId)
        }
        
        await Post.deleteOne(post)
        await user.save();
        const posts = await Promise.all(
            user.posts.map((id) => User.findById(id))
        );
        const formattedPosts = posts.map(
            ({_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views}) => {
                return {_id, categoryId, subCategoryId, adTitle, description, Price, UnitId, photos, location, views};
            }
        );
        res.status(200).json(formattedPosts);

    } catch (err){
        res.status(404).json({ message : err.message });
    }
}