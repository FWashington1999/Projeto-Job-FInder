const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

//detalhe da vaga -> view/1
router.get('/view/:id', (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render('view', {
        job,
      });
    })
    .catch((err) => console.log(err))
);

//rota da form de envio
router.get('/add', (req, res) => {
  res.render('add');
});

//add job via post
router.post('/add', (req, res) => {
  let { title, salary, company, email, isNewJob, description } = req.body;

  //inserindo
  Job.create({
    title,
    salary,
    company,
    email,
    isNewJob,
    description,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
