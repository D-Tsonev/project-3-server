import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'


export default function connectToDb(){
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  return mongoose.connect(dbURI,options)
}