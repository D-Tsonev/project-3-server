import User from '../models/user.js'
import { NotValid, NotFound } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { getCoordinates } from '../lib/api.js'

// ! New structure
async function register(req, res, next) {
  try {
    // ? get coordinates of entered address
    // ? via API
    // ? add coordinates to body before creating user
    console.log('within register')
    const { data } = await getCoordinates(
      req.body.postalCode.replace(' ', '+'),
      req.body.city.replace(' ', '+'),
      req.body.street.replace(' ', '+'),
      req.body.streetNo.replace(' ', '+'),
      req.body.country.replace(' ', '+')
    )
    console.log(data)
    // ! if no data let it try to create user and return Validation error
    if (data.length !== 0) {
      const { lat, lon } = data[0]
      req.body.coordinates = [lat, lon]
    }

    req.body.preference = req.body.preference.toLowerCase()

    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
}




async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })


    if (!user) {
      throw new NotValid('There was a problem logging in.')
    }
    const isValidPw = user.validatePassword(req.body.password)
    if (!isValidPw) {
      throw new NotValid('There was a problem logging in.')
    }

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '72h' }
    )

    console.log('Success!')
    res.status(202).json({ message: 'Login successful', token })

  } catch (e) {
    next(e)
  }
}

async function update(req, res, next) {
  try {
    const currentUserId = req.currentUser._id
    const user = await User.findById(currentUserId)
    if (!user) {
      throw new NotFound('No user found.')
    }
    user.set(req.body)
    user.save()
    res.status(202).json(user)

  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
  update,
}