const express = require('express')
const router = express();

const {
    createPost,
    getPost,
    getAllPostbyUser,
    getAllPost,
    updatePost,
    deletePost,
} = require('../controllers/Feed');
const { auth } = require('../middlewares/auth');

router.post("/create-feed",auth,createPost)
router.get('/get-feed',getPost);
router.get('/get-all-feed-by-user',auth,getAllPostbyUser);
router.get('/get-all-feed',getAllPost);
router.put('/update-feed',auth,updatePost);
router.delete('/delete-feed',auth,deletePost)

module.exports = router;