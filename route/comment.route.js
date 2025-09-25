const express = require('express');
const router = express.Router();
const commentController = require('./../controller/comment.controller');
const auth = require('../middleware/auth');

router.get('/posts/:id/comments',commentController.getAllById);
router.post('/posts/:id/comments',auth, commentController.create);
router.put('/comments/:id',auth, commentController.update);
router.delete('/comments/:id',auth, commentController.delete);

module.exports = router;
