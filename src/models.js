const db = require('../db/connection')
const fs = require('fs')

exports.selectDepartments = () => {
    return db.query("SELECT * FROM departments")
    .then(([departments]) => {
        return departments;
    })
}

exports.selectObjectsByID = (object_id) => {
    return db.query(`SELECT 
        objects.*,
        WHERE objects.object_id = $1
        GROUP BY articles.article_id;`, [object_id])
        .then(({rows}) => {
          const object = rows[0];
          if (!object) {
            return Promise.reject({status: 404, msg:'Not Found'});
          }
          return object;
        });
  
}