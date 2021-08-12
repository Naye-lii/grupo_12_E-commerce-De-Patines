/**
 * id: numerico
 * name: string
 * price: number
 * brand: string
 * description: string
 * image: string
 * color: array de strings
 */
const fs = require("fs");
const products = require('../data/products.json')
const path = require('path')

const productsModel = {
list: function(filters) {
    if (!filters) return products;
}
}

module.exports = productsModel;
