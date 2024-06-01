const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser,loginUser,getProfile,logoutUser} = require('../controllers/authController');

const allowedOrigins = ['http://localhost:5173', 'https://nimble-pika-048f39.netlify.app','https://rainbow-sfogliatella-71ce69.netlify.app'];

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
router.get('/logout', logoutUser);
  
module.exports = router