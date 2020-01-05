module.exports = (app) => {
    const slopes = require('../controllers/slope.controller.js');

    // Create a new Slope
    app.post('/slope', slopes.create);

    // Retrieve all Slopes
    app.get('/slopes', slopes.findAll);

    // Retrieve a single Slope with slopeId
    app.get('/slopes/:slopeId', slopes.findOne);

    // Update a Slope with slopeId
    app.put('/slopes/:slopeId', slopes.update);

    // Delete a Slope with slopeId
    app.delete('/slopes/:slopeId', slopes.delete);
}