const express=require("express");
const ProductoController = require('../../controllers/ProductoController');
const rooter =express.Router();
const path=require("path");
rooter.route('/products/api/alls').get(ProductoController.getProductos);
rooter.route('/products/api/find/:id').get(ProductoController.getProducto);
rooter.route('products/api/save').post(ProductoController.saveProducto);
rooter.route('products/api/update/:id').put(ProductoController.updateProducto);
rooter.route('products/api/delete').delete(ProductoController.deleteProducto);
                               
module.exports=rooter;