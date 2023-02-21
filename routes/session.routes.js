const {Router} = require('express');
const auth = require('../middlewares/auth');
const {productModel} = require('../models/product.model')


const router = Router();

router.get('/', async (req,res)=>{
  const user = await req.session.user;
  if(user){
   return res.redirect('/api/sessions/login')
  }else{
    return  res.redirect('/api/sessions/register')
  }
});

router.get('/login', async (req,res)=>{
  return res.render('login')
})


router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const users =  await req.session.user;
  const emailAdmin = 'adminCoder@coder.com';
  const passwordAdmin = 'adminCod3r123';
  try {
      if(email === emailAdmin && password === passwordAdmin){
        return res.redirect('/api/sessions/home/adm')
      }else if(email === users.email_user && password === users.password_user){
        return res.redirect('/api/sessions/home')
      }


    } catch (error) {
    console.log(error)
  }

})



router.get('/register', async (req,res)=>{
  return res.render('register')
})

router.post('/register', async (req,res)=>{
  const {firts_name,last_name,email_user,age_user,password_user} = req.body;
  try {
    req.session.user = {firts_name,last_name,email_user,age_user,password_user};
    return res.redirect('/api/sessions/login')
  } catch (error) {
    console.log(error)
  }
    
  }
    
)

router.get('/home/adm', async (req,res)=>{
  try {
    const products = await productModel.find().lean()
    const data = {
      title: 'Home',
      name: 'Admin',
      rol: 'Administrador',
      products
    }
    return res.render('home', data)
  } catch (error) {
    console.log(error)
  }
})

router.get('/home', auth, async (req,res)=>{
  
try {

  const users = req.session.user;
  const products = await productModel.find().lean()
  const data = {
    title: 'Home',
    name: users.firts_name,
    rol:'Usuario',
    products

  }
return res.render('home',data)
 } catch (error) {
  console.log(error)
 }

  
})

router.get('/logout', async (req,res)=>{
  try {
    req.session.destroy(err=>{
      if(err){
        console.log(error)
      }else{
        return res.redirect('/api/sessions/login')
      }
    })
  } catch (error) {
    console.log(error)
  }
  
})

module.exports = router;