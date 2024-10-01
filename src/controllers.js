const {selectDepartments, selectObjects, selectObjectsByID} = require("./models")

exports.getDepartments = (req, res, next) => {
    selectDepartments().then((departments)=>{
        res.status(200).send(departments)
    }).catch((err) => {
        next(err)
    })
}
exports.getObjectByID = (req, res, next) => {
    selectObjectsByID(object_id).then((object)=>{
        res.status(200).send(object)
    }).catch((err) => {
        next(err)
    })
}