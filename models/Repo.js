const mongoose = require("mongoose");

const RepoSchema = new mongoose.Schema({
    name: String,
    stargazers_count: Number,
    forks: Number,
    html_url : String
});

const Repo = mongoose.model("Repo", RepoSchema);

module.exports = Repo;