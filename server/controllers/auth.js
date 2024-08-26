const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequesError, UnauthenticatedError} = require('../errors/')
const jwt = require('jsonwebtoken')





const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields: name, email, and password' });
    }

    const user = await User.create({ name, email, password });
    console.log('User created:', user);

    const token = user.createJWT();
    console.log('Token created:', token);

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email already exists' });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Registration failed' });
  }
};









const login = async (req,res) => {
  const {email,password} = req.body

  if(!email || !password){
    throw new BadRequesError('please provide email and password')
  }

  const user = await User.findOne({email})

 
  if(!user){
    throw new UnauthenticatedError('invalid credentials')
  }

  const ispasswordCorrect = await user.comparePassword(password)
  if(!ispasswordCorrect){
    throw new UnauthenticatedError('invalid credentials')
  }
   //compare password

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{name:user.name},token})


}


module.exports = {
  register,
  login
}