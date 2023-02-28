const Scooters = require('../models/scooters');

const getScootersLocation = async (req, res) => {
    const scooters = await Scooters.find();
    res.json(scooters);
}

const addScooter = async (req, res) => {
    const { coordinates , battery } = req.body;
    if (!coordinates || !battery) return res.status(400).json({ 'message': 'coordinates are required.' });
    try {
        const scooter = new Scooters({
            coordinates: coordinates,
            battery: battery
        });
        await scooter.save();
        res.status(201).json({ 'success': `New scooter added!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { getScootersLocation, addScooter };
