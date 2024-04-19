const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.INTEGER,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    isNewJob: {
        //new job
        type: Sequelize.INTEGER,
    },
    description: {
        type: Sequelize.STRING,
    },
});

module.exports = Job;
