const db = require('./index.js');

function getAllResearchers(req, res, next) {
  db.any('SELECT * FROM researchers')
  .then((researchers) => {
    res.status(200).json({
      status: 'success',
      message: 'got all researchers',
      body: researchers
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next();
    });
}

function getSingleResearcher(req, res, next) {
  let researcherId = +(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', [researcherId])
  .then((researcher) => {
    res.status(200).json({
      status: 'success',
      message: 'got single researcher',
      body: researcher
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function addResearcher(req, res, next) {
  db.none('INSERT INTO researchers(name, job_title) VALUES (${name}, ${job_title})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 researcher'
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function editResearcher(req, res, next) {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  if(req.body.name && req.body.name.toLowerCase() === "null") {
    req.body.name = null;
  }
  if(req.body.job_title && req.body.job_title.toLowerCase() === "null") {
    req.body.job_title = null;
  }

  db.none(
    "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'updated 1 researcher'
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function deleteResearcher(req, res, next) {
  let researcherId = +(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', [researcherId])
  .then(result => {
    res.status(200).json({
      status: 'success',
      message: 'deleted researcher',
      body: result
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

module.exports = { getAllResearchers, getSingleResearcher, addResearcher, editResearcher, deleteResearcher };
