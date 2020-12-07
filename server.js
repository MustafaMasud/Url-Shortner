const express = require('express')
const mongoose = require('mongoose')
const app = express()

const shortUrl = require('./models/urlSchema')

mongoose.connect('mongodb://127.0.0.1:27017/urlShrinker',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
try{
app.listen(process.env.PORT|| 5000)
console.log('Success')
} catch(e){
    console.log('Error')
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req,res)=>{
    const short = await shortUrl.find()
    res.render('index',{short})
})

app.post('/shortUrl', async (req,res)=>{
    await shortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

app.get('/:id', async (req,res)=>{
  const shortUrls = await shortUrl.findOne({short: req.params.id})
  if(shortUrls== null){
      return res.status(404).send({error: 'invalid site'})
  }
  shortUrls.clicks++
  shortUrls.save()

  res.redirect(shortUrls.full)
})