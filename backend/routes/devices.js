
const router = require("express").Router();
const Device = require("../models/Device");

router.route("/add").post((req, res) => {
    const { serialNumber, type, status } = req.body;

    const newDevice = new Device({
        serialNumber,
        type,
        status
    });

    newDevice.save()
        .then(() => res.json("Device Added"))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/").get((req, res) => {
    Device.find()
        .then((devices) => res.json(devices))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/update/:id").put(async (req, res) => {
    let deviceId = req.params.id;
    const { serialNumber, type, status } = req.body;
    const updateDevice = {
        serialNumber,
        type,
        status
    };

    await Device.findByIdAndUpdate(deviceId, updateDevice)
        .then(() => res.status(200).send({ status: "Device Updated" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const deviceId = req.params.id;

    await Device.findByIdAndDelete(deviceId)
        .then(() => res.status(200).send({ status: "Device Deleted" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/get/:id").get(async (req, res) => {
    let deviceId = req.params.id;

    await Device.findById(deviceId)
        .then((device) => res.status(200).send({ status: "Device Fetched", device }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

module.exports = router;
