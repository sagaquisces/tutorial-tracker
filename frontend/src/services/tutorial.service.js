import http from "../http-common"

const getAll = (params) => {
    return http.get("/tutorials", { params })
}

const getAllPublished = (params) => {
    return http.get("/tutorials/published", { params })
}

const get = (id) => {
    return http.get(`/tutorials/${id}`)
}

const create = data => {
    return http.post("/tutorials", data)
}

const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data)
}

const remove = id => {
    return http.delete(`/tutorials/${id}`)
}

const removeAll = () => {
    return http.delete(`/tutorials`)
}

const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    getAllPublished,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
}