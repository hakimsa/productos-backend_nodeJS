const express=require("express");
const ProductoController = require('../../controllers/ProductoController');
const rooter =express.Router();
const path=require("path");
rooter.route('/api/v1/productos/all').get(ProductoController.getProductos);
rooter.route('/api/v1/productos/find/:id').get(ProductoController.getProducto);
rooter.route('/api/v1/productos/save').post(ProductoController.saveProducto);
rooter.route('/api/v1/producto/update/:id').put(ProductoController.updateProducto);
rooter.route('/api/v1/producto/delete').delete(ProductoController.deleteProducto);
                               
module.exports=rooter;
