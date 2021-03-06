import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import { async } from 'rxjs'
const router = express.Router()

// @desc     Fetch all products
// @route    Get /api/products
// @access   public

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // error msg to be show here if any!
    res.json(products)
}))

// @desc     Fetch single products
// @route    Get /api/products
// @access   public


router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else res.status(404).json({ message: `product not found` })

}))

export default router