const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const security = require("./security.js");

const connection = mysql.createConnection({
    host: security.host,
    user: security.user,
    password: security.password,
    database: "collabreact"
})

app.use(cors())

app.get('/', (req, res) => {
    connection.connect();
    // On selectionne les 10 categories qui ont eu les sujets les plus actifs recemment
    connection.query("SELECT * FROM Category INNER JOIN Subject on Category.id = Subject.category_id ORDER BY Subject.modified_at DESC LIMIT 10", (err, results) => {
        if(err)return console.error(err);
        res.send(results);
    });
    connection.end();
})

app.post("/category", (req,res) => {
    console.log(req);
});


app.listen(8080, () => {
    console.log('server listening on port  8080')
})