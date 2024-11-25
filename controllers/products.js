/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    allProducts: async (req, res) => {

        let products = `SELECT * FROM products ORDER BY id ASC`;

        db.query(products, (error, data, fields) => {

            if (data.length >= 1) {

                let success = true

                res.send({
                    success,
                    products: data
                })

            } else {

                let error = true
                res.json({
                    error
                })

            }

        })

    },
    productsCart: async (req, res) => {

        const {cart} = req.params

        let products_cart = `SELECT * FROM products WHERE id IN (${cart}) ORDER BY id ASC`;

        db.query(products_cart, (error, data, fields) => {

            if (data.length >= 1) {

                let success = true

                res.send({
                    success,
                    products_cart: data
                })

            } else {

                let error = true
                res.json({
                    error
                })

            }

        })

    }
}   