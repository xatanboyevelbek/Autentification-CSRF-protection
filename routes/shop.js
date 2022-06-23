const path = require('path');
const isAuth = require('../middleware/isAuth');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',isAuth, shopController.getProduct);

router.get('/cart',isAuth, shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders',isAuth, shopController.getOrders);

module.exports = router;
