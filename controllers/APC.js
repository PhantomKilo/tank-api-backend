const express = require("express");
const router = express.Router();
const APC = require("../models/APC/APC");

// GET All APCS
router.get("/", (req, res) => {
  APC.find().then((apcs) =>
    res.status(200).json({ status: 200, apcs: apcs })
  );
});

// GET a SPECIFIC APC
router.get("/:apcId", (req, res) => {
  APC.find({ _id: req.params.apcId }).then((apc) =>
    res.status(200).json({ status: 200, apc: apc })
  );
});

// POST - this will CREATE an APC
router.post("/", (req, res) => {
  console.log("Got em");
  APC.create(req.body).then((apc) =>
    res.status(201).json({ status: 201, apc: apc })
  );
});

// POST - this will CREATE a SECONDARY for a SPECIFIC APC
router.post("/:apcId/secondary", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
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

// POST - this will ADD an IMAGE for a SPECIFIC APC
router.post("/:apcId/image", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
    },
    {
      $push: { images: req.body },
    }
  )
    .then((image) => res.status(201).json({ status: 201, image: image }))
    .catch((error) => console.log(error));
});

// DELETE - this will DELETE a SPECIFIC APC
router.delete("/:apcId", (req, res) => {
  APC.deleteOne({ _id: req.params.apcId }).then((apc) => {
    res.json({
      status: 204,
      apc: apc,
    });
  });
});

// DELETE - this will DELETE a SPECIFIC WEAPON for an APC
router.delete("/:apcId/secondary/:secondaryId", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
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

// DELETE - this will DELETE a SPECIFIC WEAPON for an APC
router.delete("/:apcId/image/:imageId", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
    },
    {
      $pull: { image: { _id: req.params.imageId } },
    }
  )
    .then((image) => res.status(201).json({ status: 201, image: image }))
    .catch((error) => console.log(error));
});

// PUT by ID - this will UPDATE an APC MODEL
router.put("/:apcId", (req, res) => {
  APC.findOneAndUpdate({ _id: req.params.apcId }, req.body, {
    new: true,
  }).then((apc) => res.status(200).json({ status: 200, apc: apc }));
});

// PUT - this will update a SPECIFIC SECONDARY for an APC
router.put("/:apcId/secondary/:secondaryId", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
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

// PUT - this will update a SPECIFIC IMAGE for an APC
router.put("/:apcId/image/:imageId", (req, res) => {
  APC.updateOne(
    {
      _id: req.params.apcId,
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
