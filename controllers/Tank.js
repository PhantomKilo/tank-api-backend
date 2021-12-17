const express = require('express')
const router = express.Router()
const Tank = require('../models/Tank')

// GET all MEMBERs 
router.get('/', (req, res) => {
    Tank.find()
        .then(tanks => res.status(200).json({status: 200, tanks: tanks}))
})

// GET a SPECIFIC MEMBER
router.get('/:tankId', (req, res) => {
  Tank.find({ _id:  req.params.tankId})
      .then(tank => res.status(200).json({status: 200, tank: tank}))
})

// POST - this will CREATE a MEMBER
router.post('/', (req, res) => {
    console.log('Got em')
    Tank.create(req.body)
        .then(tank => res.status(201).json({ status: 201, tank: tank}))
})

// POST - this will CREATE an AMMO TYPE for a SPECIFIC TANK
router.post('/:tankId', (req, res) => {
  Tank.updateOne(
      {
        _id: req.params.tankId
        }, 
      {
        $push: {ammo: req.body} 
        } 
      )
      .then(tank => res.status(201).json({ status: 201, tank: tank}))
      .catch(error => console.log(error))
})

// POST - this will CREATE an AMMO TYPE for a SPECIFIC TANK
router.post('/:tankId', (req, res) => {
    Tank.updateOne(
        {
          _id: req.params.tankId
          }, 
        {
          $push: {secondary: req.body} 
          } 
        )
        .then(tank => res.status(201).json({ status: 201, tank: tank}))
        .catch(error => console.log(error))
  })


// DELETE - this will DELETE a SPECIFIC MEMBER 
router.delete('/:tankId', (req, res) => {
    Tank.deleteOne({ _id:  req.params.tankId})
    .then(tank => {
        res.json({
          status: 204,
          tank: tank
        })
      })
})

// DELETE - this will DELETE a SPECIFIC AMMO TYPE for a TANK
router.delete('/:tankId/:ammoId', (req, res) => {
    Tank.updateOne(
        {
          _id: req.params.tankId
          }, 
        {
          $pull: {ammo: {"_id": req.params.ammoId}} 
          } 
        )
        .then(ammo => res.status(201).json({ status: 201, ammo: ammo}))
        .catch(error => console.log(error))
})


// DELETE - this will DELETE a SPECIFIC WEAPON for a TANK
router.delete('/:tankId/:secondaryId', (req, res) => {
    Tank.updateOne(
        {
          _id: req.params.tankId
          }, 
        {
          $pull: {secondary: {"_id": req.params.secondaryId}} 
          } 
        )
        .then(secondary => res.status(201).json({ status: 201, secondary: secondary}))
        .catch(error => console.log(error))
})

// PUT by ID - this will UPDATE a TANK MODEL
router.put('/:tankId', (req, res) => {
    Tank.findOneAndUpdate({ _id: req.params.tankId}, req.body,  {new: true})
        .then(tank => res.status(200).json({status: 200, tank: tank}))
})

// PUT - this will update a SPECIFIC AMMO TYPE for a TANK
router.put('/:tankId/:ammoId', (req, res) => {
    Tank.updateOne(
        {
          _id: req.params.tankId, "ammo._id": req.params.ammoId
          }, 
        {
            $set: {"ammo.$": req.body}
        },

        )
        .then(tank => res.status(201).json({ status: 201, tank: tank}))
        .catch(error => console.log(error))
  })

  // PUT - this will update a SPECIFIC SECONDARY for a TANK
router.put('/:tankId/:secondaryId', (req, res) => {
    Tank.updateOne(
        {
          _id: req.params.tankId, "secondary._id": req.params.secondaryId
          }, 
        {
            $set: {"secondary.$": req.body}
        },

        )
        .then(tank => res.status(201).json({ status: 201, tank: tank}))
        .catch(error => console.log(error))
  })

module.exports = router