const Slope = require('../models/slope.model.js');

// Create and Save a new Slope
exports.create = (req, res) => {
	if(!req.body.lat || !req.body.long) {
        return res.status(400).send({
            message: "Slope lat/long can not be empty"
        });
    }

	// Create a Slope
    const slope = new Slope({
        name: req.body.name || "Untitled Sloped", 
        long: req.body.long,
        lat: req.body.lat
    });

    // Save Slope in the database
    slope.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Slope."
        });
    });
};

// Retrieve and return all slopes from the database.
exports.findAll = (req, res) => {
	Slope.find()
    .then(slopes => {
        res.send(slopes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving slopes."
        });
    });
};

// Find a single slope with a slopeId
exports.findOne = (req, res) => {
	Slope.findById(req.params.SlopeId)
    .then(slope => {
        if(!slope) {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });            
        }
        res.send(slope);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving slope with id " + req.params.slopeId
        });
    });
};

// Update a slope identified by the slopeId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Slope content can not be empty"
        });
    }

    // Find slope and update it with the request body
    Slope.findByIdAndUpdate(req.params.slopeId, {
        name: req.body.name || "Untitled Slope",
        long: req.body.long,
        lat: req.body.lat,
        crowded: req.body.crowded,
        good: req.body.good,
        nosnow: req.body.nosnow,
        cableclosed: req.body.cableclosed
    }, {new: true})
    .then(slope => {
        if(!slope) {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });
        }
        res.send(slope);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });                
        }
        return res.status(500).send({
            message: "Error updating slope with id " + req.params.slopeId
        });
    });
};

// Delete a slope with the specified slopeId in the request
exports.delete = (req, res) => {
	Slope.findByIdAndRemove(req.params.slopeId)
    .then(slope => {
        if(!slope) {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });
        }
        res.send({message: "Slope deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Slope not found with id " + req.params.slopeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete slope with id " + req.params.slopeId
        });
    });
};