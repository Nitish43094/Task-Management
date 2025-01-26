const User = require('../models/User');
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { task, description } = req.body;
        const userId = req.user.id;
        if (!task || !description) {
            return res.status(401).json({
                success: false,
                message: "All Field Are Required",
            })
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Valid",
            })
        }
        const createtask = await Task.create({
            task,
            description,
            userId: userId,
        })
        await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { task: createtask._id } },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Task Created",
            data: createtask,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Somthing Error while Create a Task",
            error,
        })
    }
}
// 
exports.getAllTask = async (req, res) => {
    try {
        const data = await Task.find().populate("userId").exec();
        return res.status(200).json({
            success: true,
            message: "All Tash is Fetching",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somthing Error while Fetching Data",
            error,
        })
    }
}

exports.getAllTaskbyUser = async(req,res)=>{
    const userId = req.user.id;
    try{
        const post = await Task.find({userId}).populate("userId").exec();
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

exports.updateTask = async (req, res) => {
    try {
        const { task, description, id } = req.body;
        const userId = req.user.id;
        if (!task || !description || !id) {
            return res.status(401).json({
                success: false,
                message: "All Field Are Required",
            })
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Valid",
            })
        }
        const updatetask = await Task.findByIdAndUpdate(id)
        updatetask.task = task;
        updatetask.description = description;
        updatetask.save();
        return res.status(200).json({
            success: true,
            message: "Update Successfully",
            updatetask,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somthing Error while Fetching Data",
            error,
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body;
        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $pull: {
                    task: id,
                }
            }
        )
        await Task.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Delete The Task Your DataBase",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somthing Error while Deleteing Task",
            error,
        })
    }
}