const db = require("../models")
const Tutorial = db.tutorials

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty!" })
        return
    }

    // Create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    })

    // Save tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the tutorial."
            })
        })
}

exports.findAll = (req, res) => {
    const title = req.query.title
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}

    Tutorial.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id })
        })
    
}

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving published tutorials"
            })
        })
}

exports.update = (req, res) => {
    
}

exports.delete = (req, res) => {
    
}

exports.deleteAll = (req, res) => {
    
}