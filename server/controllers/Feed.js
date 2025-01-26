const User = require('../models/User');
const Feed = require('../models/Feed');
const uploadMediaToCloudinary = require('../utils/imageUploder');

exports.createPost = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.files?.image;
        const userId = req.user.id;
        console.log(userId)
        if (!title || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }
        const user = await User.findById({_id:userId});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Session expired or user not found.",
            });
        }

        const response = await uploadMediaToCloudinary(image, process.env.FOLDER_NAME);

        const post = await Feed.create({
            title,
            image: response.secure_url,
            userId,
        });

        await User.findByIdAndUpdate(
            {_id:userId},
            { $push: { feed: post._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post,
        });
    } catch (error) {
        console.error("Error while creating the post:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the post.",
            error: error.message,
        });
    }
};

exports.getPost = async(req,res) =>{
    try{
        const {postId} = req.body;
        if(!postId){
            return res.status(401).json({
                success:false,
                message:"Id Not Valide",
            })
        }
        const post = await Feed.findById({_id:postId}).populate("userId").exec();
        return res.status(200).json({
            success:true,
            message:"Get Psot Successfully",
            data:post,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Somthing Error while fetching psot",
        })
    }
}
exports.getAllPostbyUser = async(req,res)=>{
    const userId = req.user.id;
    try{
        const post = await Feed.find({userId}).populate("userId").exec();
        return res.status(200).json({
            success:true,
            message:"Get All Post Fatching Successfully",
            data:post,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Somthing IS Error while get All Post",
        })
    }
}

exports.getAllPost = async(req,res)=>{
    try{
        const post = await Feed.find().populate("userId").exec();
        return res.status(200).json({
            success:true,
            message:"Get All Post Fatching Successfully",
            data:post,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Somthing IS Error while get All Post",
        })
    }
}

exports.updatePost = async(req,res) =>{
    try{
        const {title,currentFeedId} = req.body;
        const userid = req.user.id;
        console.log(currentFeedId ," ",userid);
        const user = await User.findById({_id:userid});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User does not Exist",
            }) 
        }
        if(!title){
            return res.status(500).json({
                success:false,
                message:"Title Is Required",
            })
        }
        const post = await Feed.findById({_id:currentFeedId});
        post.title = title;
        post.save();
        return res.status(200).json({
            success:true,
            message:"Post Update Successfully",
            data:post,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Somthing Error while Update Post",
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;

        const post = await Feed.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }
        await Feed.findByIdAndDelete(id);
        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $pull: { feed: id },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully.",
        });
    } catch (error) {
        console.error("Error while deleting the post:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the post.",
        });
    }
};
