const express = require('express')
const router = express.Router()
const postController = require ('../controller/postController.js')

router.get('/', postController.index);

router.get('/:id', postController.show);

router.post('/', postController.create);

router.put('/:slug', postController.update);

router.delete('/:slug', postController.destroy);

module.exports = router