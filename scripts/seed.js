require("dotenv").config();
console.log(process.env.GITHUB_USERNAME);
const mongoose = require("mongoose");
const axios = require("axios");
const chalk = require("chalk");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/profilemaker");

const db = require("../models");

console.log(chalk.green(`Retrieving the info for ${process.env.GITHUB_USERNAME}`))
axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`).then(({data:repos}) => {
    db.Repo.remove({}).then(() => {
        db.Repo.create(repos.map(({name, stargazers_count, forks, html_url}) => {
            return {
                name,
                stargazers_count,
                forks,
                html_url
            }
        })).then(response => {
            console.log(chalk.green("Completed Repo download"))
            console.log(response.length + " Repos downloaded")
        })
    });
})

