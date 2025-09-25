const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const commentController = require('./../controller/comment.controller');
const multerMiddleware = require('../middleware/multer.middleware');
const auth = require('../middleware/auth');

router.get('/',postController.getAll);
router.get('/:id',postController.getById);
router.post('/', auth, multerMiddleware, postController.create);
router.put('/:id',postController.update);
router.delete('/:id',postController.delete);
router.get('/:id/comments',commentController.getAllById);
router.post('/:id/comments', auth, commentController.create);

module.exports = router;
