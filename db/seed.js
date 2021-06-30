import connectToDb from './connectToDb.js'
import mongoose from 'mongoose'

import Item from '../models/item.js'
import itemData from './data/items.js'

import User from '../models/user.js'
import usersData from '../db/data/users.js'

import Recipe from '../models/recipe.js'
import recipeData from '../db/data/recipes.js'
import inventoryItem from '../models/inventoryItem.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('✅ Connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('removed all items')

    const users = await User.create(usersData)
    console.log(`👏🏼 ${users.length}users created`)
    console.log(users)

    // ? Now I can seed my database using mongoose....
    const item = await Item.create(itemData)
    console.log(`🤖 ${item.length} recipes created!`)

    // ? add inventoryItems to users
    const dimisItem = {
      item: item[0]._id,
      quantity: 3,
      expiryDate: '2022-05-22',
      user: users[0]._id,
      isShared: true,
    }
    await inventoryItem.create(dimisItem)
    console.log(dimisItem)
    const jonasItem = {
      item: item[1]._id,
      quantity: 4,
      expiryDate: '2022-05-22',
      user: users[1]._id,
      isShared: true,
    }
    await inventoryItem.create(jonasItem)
    const abusItem = {
      item: item[2]._id,
      quantity: 4,
      expiryDate: '2022-05-22',
      user: users[2]._id,
      isShared: true,
    }
    await inventoryItem.create(abusItem)


    // ? seeding the recipes    
    const recipe = await Recipe.create(recipeData)
    console.log(`${recipe.length} recipes created!`)


    await mongoose.connection.close()
    console.log('Disconnected from mongo. All done')
  } catch (e)   {
    console.log('Someting when wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()