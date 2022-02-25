const express = require("express");
const router = express.Router();
const IFV = require("../models/IFV/IFV");

// GET All IFVS
router.get("/", (req, res) => {
  IFV.find().then((ifvs) =>
    res.status(200).json({ status: 200, ifvs: ifvs})
  );
});

// GET a SPECIFIC IFV
router.get("/:ifvId", (req, res) => {
  IFV.find({ _id: req.params.ifvId }).then((ifv) =>
    res.status(200).json({ status: 200, ifv: ifv })
  );
});

// POST - this will CREATE a IFV
router.post("/", (req, res) => {
  console.log("Got em");
  IFV.create(req.body).then((ifv) =>
    res.status(201).json({ status: 201, ifv: ifv })
  );
});

// POST - this will CREATE an AMMO TYPE for a SPECIFIC IFV
router.post("/:ifvId/ammo", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $push: { ammo: req.body },
    }
  )
    .then((ammo) => res.status(201).json({ status: 201, ammo: ammo }))
    .catch((error) => console.log(error));
});

// POST - this will CREATE a SECONDARY for a SPECIFIC IFV
router.post("/:ifvId/secondary", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $push: { secondary: req.body },
    }
  )
    .then((secondary) =>
      res.status(201).json({ status: 201, secondary: secondary })
    )
    .catch((error) => console.log(error));
});

// POST - this will ADD an IMAGE for a SPECIFIC IFV
router.post("/:ifvId/image", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $push: { images: req.body },
    }
  )
    .then((image) => res.status(201).json({ status: 201, image: image }))
    .catch((error) => console.log(error));
});

// DELETE - this will DELETE a SPECIFIC IFV
router.delete("/:ifvId", (req, res) => {
  IFV.deleteOne({ _id: req.params.ifvId }).then((ifv) => {
    res.json({
      status: 204,
      ifv: ifv,
    });
  });
});

// DELETE - this will DELETE a SPECIFIC AMMO TYPE for an IFV
router.delete("/:ifvId/ammo/:ammoId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $pull: { ammo: { _id: req.params.ammoId } },
    }
  )
    .then((ammo) => res.status(201).json({ status: 201, ammo: ammo }))
    .catch((error) => console.log(error));
});

// DELETE - this will DELETE a SPECIFIC WEAPON for an IFV
router.delete("/:ifvId/secondary/:secondaryId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $pull: { secondary: { _id: req.params.secondaryId } },
    }
  )
    .then((secondary) =>
      res.status(201).json({ status: 201, secondary: secondary })
    )
    .catch((error) => console.log(error));
});

// DELETE - this will DELETE a SPECIFIC WEAPON for an IFV
router.delete("/:ifvId/image/:imageId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
    },
    {
      $pull: { image: { _id: req.params.imageId } },
    }
  )
    .then((image) => res.status(201).json({ status: 201, image: image }))
    .catch((error) => console.log(error));
});

// PUT by ID - this will UPDATE an IFV MODEL
router.put("/:ifvId", (req, res) => {
  IFV.findOneAndUpdate({ _id: req.params.ifvId }, req.body, {
    new: true,
  }).then((ifv) => res.status(200).json({ status: 200, ifv: ifv }));
});

// PUT - this will update a SPECIFIC AMMO TYPE for an IFV
router.put("/:ifvId/ammo/:ammoId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
      "ammo._id": req.params.ammoId,
    },
    {
      $set: { "ammo.$": req.body },
    }
  )
    .then((ammo) => res.status(201).json({ status: 201, ammo: ammo }))
    .catch((error) => console.log(error));
});

// PUT - this will update a SPECIFIC SECONDARY for a IFV
router.put("/:ifvId/secondary/:secondaryId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
      "secondary._id": req.params.secondaryId,
    },
    {
      $set: { "secondary.$": req.body },
    }
  )
    .then((secondary) =>
      res.status(201).json({ status: 201, secondary: secondary })
    )
    .catch((error) => console.log(error));
});

// PUT - this will update a SPECIFIC IMAGE for a IFV
router.put("/:ifvId/image/:imageId", (req, res) => {
  IFV.updateOne(
    {
      _id: req.params.ifvId,
      "images._id": req.params.imageId,
    },
    {
      $set: { "images.$": req.body },
    }
  )
    .then((image) => res.status(201).json({ status: 201, image: image }))
    .catch((error) => console.log(error));
});

module.exports = router;
