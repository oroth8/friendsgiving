const express = require("express");
const router = express.Router();

const User = require('../models/User')

// display homepage and all database entries
router.get('/', async (req, res) => {
    try {
      const users = await User.find({})
        .lean()
      res.render('index', {
        users,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

// display add form 
router.get('/add', (req,res) => {
    res.render('add', {
        layout: 'main'
    })
})
// create a new entry in the database
router.post('/add', async (req, res) => {
    try {
        await User.create(req.body);
      res.redirect('/')
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

// delete selected entry by id
router.post('/:id', async(req, res)=>{
  try{
    // let user = await User.findById(req.params.id).lean()
    await User.remove({_id: req.params.id});
    res.redirect('/');
  }
  catch (err) {
  console.error(err)
  return res.render('error/500')
  }
})

module.exports = router;