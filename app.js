import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js'
import mongoose, { mongo } from 'mongoose'
import { resolveInclude } from 'ejs'
import { priceInCents } from './helpers/product-views.js'
import { imgCheckIfEmpty } from './helpers/img-view.js'
import 'dotenv/config'

const app = express()
const PORT = 4000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected🔌'))
    .catch(error => console.error(error))

    const productSchema = new mongoose.Schema({
        slug: { type: String,  required: true, unique: true},
        name: { type: String, required: true },
        price: { type: Number, required: true }, 
        //specialprice: { type: Number},
        isInStock: { type: Boolean, required: true, default: true },
        img: { type: String, equired: true }
      })
      
      const Product = mongoose.model('Product', productSchema)

// const products = [
//     {name: "Object 1", slug: 'object-1', isInStock: true},
//     {name: "Object 2", slug: 'object-2', isInStock: false},
//     {name: "Object 3", slug: 'object-3', isInStock: true}
// ] 

app.use(logger)
app.use(express.static('public'))
app.use('/assets', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.set('views', path.join(__dirname, 'views'));


app.get('/', async (request, response) => {
  try {
    // const products = await Product.find({}).exec()
    const products = await Product.find({ isInStock: true }).exec()
    console.log(products)

    response.render('index.ejs', { 
      productCount: 3,
      products: products,
      imgCheckIfEmpty: imgCheckIfEmpty
    })
    }catch(error) {
      console.error(error)
      response.render('index.ejs', { 
        products: [],
        imgCheckIfEmpty: imgCheckIfEmpty
      })
    }
    // response.render('index')
  })

 

app.get('/products', async (request, response) => {
  try {
    // const products = await Product.find({}).exec()
    const products = await Product.find({ isInStock: true }).exec()
    console.log(products)

    response.render('products.ejs', { 
      productCount: 3,
      products: products,
      imgCheckIfEmpty: imgCheckIfEmpty
    })
    }catch(error) {
      console.error(error)
      response.render('products.ejs', { 
        products: [],
        imgCheckIfEmpty: imgCheckIfEmpty
      })
    }
    // const productCount = 3 //can conntect to a function
    // response.render('products', {productCount: productCount, products: products } )
  })

  app.post('/search', function (req, res) {
    var name = req.body.search;
    res.redirect('/search/' + name);
    })

  app.get('/search/:name', async (request, response) => {
    try {
      const name = request.params.name
      const product = await Product.findOne({ name: name }).exec()
      if(!product) throw new Error('Product not found')
  
      response.render('sp', { 
        product: product,
        imgCheckIfEmpty: imgCheckIfEmpty
      })
    }catch(error) {
      console.error(error)
      response.status(404).send('Could not find the product you\'re looking for.')
    }
      // response.render('sp', {products: products} )
      //response.send(`This is Product ${productId}`)
  })

app.get('/products/:slug', async (request, response) => {
  try {
    const slug = request.params.slug
    const product = await Product.findOne({ slug: slug }).exec()
    if(!product) throw new Error('Product not found')

    response.render('sp', { 
      product: product,
      imgCheckIfEmpty: imgCheckIfEmpty
    })
  }catch(error) {
    console.error(error)
    response.status(404).send('Could not find the product you\'re looking for.')
  }
    // response.render('sp', {products: products} )
    //response.send(`This is Product ${productId}`)
})

app.get('/products/:productId/price/:priceId', (request, response) => {
    const productId = request.params.productId
    const priceId = request.params.priceId
  
    response.send(`The product is ${productId} and the price is ${priceId}`)
  })

app.get('/about',(request, response) => {
    response.render('about')
})

app.get('/testqueries', (request, response) => {
    console.log(request.query)
  
    response.send('Testing queries')
  })

app.get('/test', (request, response) => {
    response.render('test', { products: products})
})

app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('Thank you for your ticket, nothing will happen')
})

app.get('/dev_products/dev_add_product', (request, response) => {
    response.render('dev_products/dev_add_product')
})

app.post('/dev_products/dev_add_product', async (request, response) => {
    try{
        const product = new Product({
            slug: request.body.slug,
            name: request.body.name,
            price: request.body.price
          })
        await product.save()
            response.send('product creaction confirmed ')
    }catch (error) {
        console.error(error)
        response.send('Error: product might already exist')
    }
  })

  app.get('/dev_products', async (request, response) => {
    try {
      // const products = await Product.find({}).exec()
      const products = await Product.find({ isInStock: true }).exec()
      console.log(products)
  
      response.render('dev_products/dev_read_index', { 
        products: products
      })
      }catch(error) {
        console.error(error)
        response.render('dev_products/dev_read_index', { 
          products: []
        })
      }
    })

    app.get('/dev_products/:slug', async (request, response) => {
      try {
        const slug = request.params.slug
        const product = await Product.findOne({ slug: slug }).exec()
        if(!product) throw new Error('Product not found')
    
        response.render('dev_products/dev_read_product', { 
          product: product
        })
      }catch(error) {
        console.error(error)
        response.status(404).send('Could not find the product you\'re looking for.')
      }
    })

    app.get('/dev_products/:slug/dev_edit_product', async (request, response) => {
      try {
        const slug = request.params.slug
        const product = await Product.findOne({ slug: slug }).exec()
        if(!product) throw new Error('Product not found')
    
        response.render('dev_products/dev_edit_product', { product: product })
      }catch(error) {
        console.error(error)
        response.status(404).send('Could not find the product you\'re looking for.')
      }
    })

    app.post('/dev_products/:slug', async (request, response) => {
      try {
        const product = await Product.findOneAndUpdate(
          { slug: request.params.slug }, 
          request.body,
          { new: true }
        )
        
        response.redirect(`/dev_products/${product.slug}`)
      }catch (error) {
        console.error(error)
        response.send('Error: The product could not be created.')
      }
    })

    app.get('/dev_products/:slug/delete', async (request, response) => {
      try {
        await Product.findOneAndDelete({ slug: request.params.slug })
        
        response.redirect('/dev_products')
      }catch (error) {
        console.error(error)
        response.send('Error: No product was deleted.')
      }
    })


app.listen(process.env.PORT, () => {
    console.log(`Server Online 🌎 (Port ${process.env.PORT})`)
})