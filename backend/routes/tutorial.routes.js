module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller")

    const router = require("express").Router()

    // Create a new tutorial
    router.post("/", tutorials.create)

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    app.use('/api/tutorials', router)
}