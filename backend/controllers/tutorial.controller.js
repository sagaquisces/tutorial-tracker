const db = require("../models")
const Tutorial = db.tutorials

const getPagination = (page, size) => {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0

    return { limit, offset }
}

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
    const { page, size, title } = req.query
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}
    const { limit, offset } = getPagination(page, size)

    Tutorial.paginate(condition, { offset, limit })
        .then(data => {
            res.send({
                totalItems: data.totalDocs,
                tutorials: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1
            })
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
    const { page, size, title } = req.query
    const condition = { published: true }
    const { limit, offset } = getPagination(page, size)

    Tutorial.paginate(condition, { offset, limit })
        .then(data => {
            res.send({
                totalItems: data.totalDocs,
                tutorials: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving published tutorials."
            })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty."
        })
    }

    const id = req.params.id

    Tutorial.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                })
            } else res.send({ message: "Tutorial was updated successfully."})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial wilh id=${id}. Maybe Tutorial was not found!`
                })
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            })
        })
}

exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            })
        })
}