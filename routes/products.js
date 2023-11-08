const router = require('express').Router();
const productController = require('../controllers/productsController');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.get('/search/:key', productController.searchProduct);

module.exports =router;