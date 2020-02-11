require("dotenv").config();
console.log(process.env.GITHUB_USERNAME);
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/profilemaker");

const db = require("./models");
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    db.Repo.find({}).then(repos => {
        res.send(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${process.env.GITHUB_USERNAME} Profile</title>
            </head>
            <body>
                <h1>${process.env.GITHUB_USERNAME}'s Repos</h1>
                <ul>
                    ${repos.map(repo => {
                        return `<li><a href=${repo.html_url}>${repo.name} - Stars: ${repo.stargazers_count}</a></li>`
                    }).join("")
                    }
                </ul>
            </body>
        </html>
            
        `)
    })
})
app.listen(process.env.PORT || 3000);