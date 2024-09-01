import express from 'express'
import dbConnection from './database/db_Connection.js'
// import brandRouter from './modules/brand/brand.routes.js'
// import categoryRouter from './modules/category/category.routes.js'
// import productRouter from './modules/product/product.routes.js'
// import subcategoryRouter from './modules/subcategory/subcategory.routes.js'
import dotenv from 'dotenv'
import path from 'path'
import { authRouter, brandRouter, cartRouter, categoryRouter, couponRouter, productRouter, reviewRouter, subcategoryRouter, wishlistRouter } from './modules/index.js'
import orderRouter from './modules/order/order.routes.js'
import { AppError, globalError } from './utils/error.js'

const fullPath = path.resolve("./utils/config//.env")
dotenv.config({ path: fullPath });

dbConnection()
const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use("/uploads", express.static('./uploads'))

app.use('/api/categories', categoryRouter)
app.use('/api/sub-categories', subcategoryRouter)
app.use('/api/brands', brandRouter)
// app.use('/api/products', productRouter)
app.use('/products', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/cart', cartRouter)
app.use('/api/coupons', couponRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res, next) => {
    res.json({ message: "Hello World!" })
})

app.use('*', (req, res, next) => {
    next(new AppError(`Route Not Found: ${req.originalUrl}`, 404))
})
app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
