const Product = require('../models/Products')


module.exports = {
    createProduct: async(req, res) => {
      const newProduct = new Product(req.body);
      try {
        await newProduct.save();
        res.status(200).json("Product created successfully");
      } catch (error) {
        console.error(error);
        res.status(500).json("Failed to create product");
      }
    },

    getAllProducts: async(req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1})
            res.status(200).json(products)
        } catch (error) {
            console.error(error);
            res.status(500).json("No products available");
        }
    },

    getProduct: async(req, res) => {
       try {
          const product = await Product.findById(req.params.id)
          res.status(200).json(product)
       } catch (error) {
        console.error(error);
        res.status(500).json("Product not available");
       }
    },

    searchProduct: async(req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "shop",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("Product can not be found");
        }
    }
}