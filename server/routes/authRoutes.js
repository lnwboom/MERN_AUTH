const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser,loginUser,getProfile} = require('../controllers/authController');

const allowedOrigins = ['http://localhost:5173', 'https://teal-kangaroo-de17ba.netlify.app','https://mern-auth-rust.vercel.app/'];

//middleware
router.use(
    cors({
        credentials: true,
        origin: allowedOrigins
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
  
module.exports = router