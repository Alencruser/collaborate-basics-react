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

//Securisation input
const blbl = (str) => {
	if (str == null) return '';
	return String(str).
		replace(/&/g, '&amp;').
		replace(/</g, '&lt;').
		replace(/>/g, '&gt;').
		replace(/"/g, '&quot;').
		replace(/--/g, '&#151;').
		replace(/'/g, '&#039;');
};

const mysqlError = {
    1062: "Duplication de nom"
}

connection.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    // On selectionne les 10 categories qui ont eu les sujets les plus actifs recemment
    connection.query("SELECT * FROM Category INNER JOIN Subject on Category.id = Subject.category_id ORDER BY Subject.modified_at DESC LIMIT 10", (err, results) => {
        if(err)return console.error(err);
        res.send(results);
    });
});

app.post("/category", (req,res) => {
    const sanitizedTitle = blbl(req.body.title);
    // add verification later for user connected or not, or duplicate name, and sanitize input with blbl
    if(!sanitizedTitle?.length)return res.send(false);
        connection.query(`INSERT INTO Category (name, created_at, approved) VALUES ('${sanitizedTitle}',NOW(), 0)`, (err, results) => {
            if(err){
                return res.status(500).send(JSON.stringify({err: mysqlError[err.errno]}));
              }
              res.send(JSON.stringify({success: true}));
        });
});


app.listen(8080, () => {
    console.log('server listening on port  8080')
})