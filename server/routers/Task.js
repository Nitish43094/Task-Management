const express = require('express')
const router = express.Router();

const {
    createTask,
    getAllTask,
    getAllTaskbyUser,
    updateTask,
    deleteTask
} = require('../controllers/Task');
const { auth } = require('../middlewares/auth');

router.post('/create-task',auth,createTask)
router.get('/get-all-task',getAllTask);
router.get("/get-all-task-by-user",auth,getAllTaskbyUser);
router.put('/update-task',auth,updateTask)
router.delete('/delete-task',auth,deleteTask);

module.exports = router;
