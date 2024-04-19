const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const sequelize = require('./db/connection');
const { Op } = require('sequelize');

const PORT = 3000;

//usando body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//chamando porta que vai funcionar
app.listen(PORT, function () {
  console.log(`o app esta funcionando na porta ${PORT}`);
});

//db connection
db.authenticate()
  .then(() => {
    console.log('conectou com sucesso');
  })
  .catch((err) => {
    console.log('Erro ao conectar', err);
  });

//route
app.get('/', (req, res) => {
  let search = req.query.job;
  let query = '%' + search + '%'; //PH -> PHP, Word -> WordPress, Press -> WordPress

  if (!search) {
    Job.findAll({ order: [['createdAT', 'DESC']] })
      .then((jobs) => {
        res.render('index', {
          jobs,
        });
      })
      .catch((err) => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [['createdAT', 'DESC']],
    })
      .then((jobs) => {
        res.render('index', {
          jobs,
          search,
        });
      })
      .catch((err) => console.log(err));
  }
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));
