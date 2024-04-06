// routes/locations.js

const router = require("express").Router();
const Location = require("../models/Location");

router.route("/add").post((req, res) => {
    const { locationName, address, phone } = req.body;

    const newLocation = new Location({
        locationName,
        address,
        phone
    });

    newLocation.save()
        .then(() => res.json("Location Added"))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/").get((req, res) => {
    Location.find()
        .then((locations) => res.json(locations))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/update/:id").put(async (req, res) => {
    let locationId = req.params.id;
    const { locationName, address, phone } = req.body;
    const updateLocation = {
        locationName,
        address,
        phone
    };

    await Location.findByIdAndUpdate(locationId, updateLocation)
        .then(() => res.status(200).send({ status: "Location Updated" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const locationId = req.params.id;

    await Location.findByIdAndDelete(locationId)
        .then(() => res.status(200).send({ status: "Location Deleted" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/get/:id").get(async (req, res) => {
    let locationId = req.params.id;

    await Location.findById(locationId)
        .then((location) => res.status(200).send({ status: "Location Fetched", location }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
