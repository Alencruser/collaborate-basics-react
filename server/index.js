const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require("mysql2");
const security = require("./security.js");
const session = require('express-session');
const bcrypt = require("bcrypt");


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
    1062: "Duplication de nom",
    1452: "Probleme inconnu, veuillez contacter l'administrateur"
}

connection.connect();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ 
    secret:security.secretSession,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized:true
}));


app.get('/', (req, res) => {
    // On selectionne les 10 categories qui ont eu les sujets les plus actifs recemment
    connection.query("SELECT * FROM Category INNER JOIN Subject on Category.id = Subject.category_id ORDER BY Subject.modified_at DESC LIMIT 10", (err, results) => {
        if(err)return console.error(err);
        res.send(JSON.stringify({data: results}));
    });
});

app.post("/category", (req,res) => {
    const sanitizedTitle = blbl(req.body.title);
    // add verification later for user connected or not, or duplicate name, and sanitize input with blbl
    if(!sanitizedTitle?.length)return res.status(500).send(JSON.stringify({err: "Probleme serveur"}));
        connection.query(`INSERT INTO Category (name, created_at, approved) VALUES ('${sanitizedTitle}',NOW(), 0)`, (err, results) => {
            if(err){
                return res.status(500).send(JSON.stringify({err: mysqlError[err.errno]}));
              }
              res.send(JSON.stringify({data: {success:true}}));
        });
});

app.post("/register", (req,res) => {
    const pseudo = blbl(req.body["user-nickname"]);
    const mail = blbl(req.body["user-mail"]);
    const pass = blbl(req.body["user-pass"]);
    const birth = blbl(req.body["user-birthdate"]);

    bcrypt.hash(pass, 10, (err, hashedPass) => {
        connection.query(`INSERT INTO User (pseudo, mail, pass, birth_date, created_at, last_connection, role) VALUES ('${pseudo}', '${mail}', '${hashedPass}', '${birth}', NOW(), NOW(), 1)`, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).send(JSON.stringify({err: mysqlError[err.errno]}));
              }
              req.session.pseudo = pseudo;
              req.session.role = 1;
              req.session.save((err)=>{
                res.send(JSON.stringify({data:{pseudo, role: 1}}))
            })
        });
    });

});

app.post("/connect", (req,res) => {
    const pseudo = blbl(req.body["user-nickname"]);
    const pass = blbl(req.body["user-pass"]);

    connection.query(`SELECT pseudo, pass, role FROM User WHERE pseudo = '${pseudo}'`, (errSql, results) => {
        if(errSql){
            console.log(errSql)
            return res.status(500).send(JSON.stringify({err: mysqlError[errSql.errno]}));
        }
        bcrypt.compare(pass, results[0]?.pass, (err, samePass) => {
              if(!results.length || !samePass) {
                return res.status(500).send({err: "Nom de compte ou mot de passe incorrect"})
              }
              req.session.pseudo = pseudo;
              req.session.role = 1;
              req.session.save((err)=>{
                  console.log(req.session)
                  res.send(JSON.stringify({data:{pseudo, role: 1}}))
              })
        });
    });

});

app.get("/disconnect",  (req,res) => {
    console.log("destruction asked for", req.session)
    setTimeout(()=> {
        // req.session.destroy();
        res.send(JSON.stringify({data:{success:true}}));
    }, 500)
});

// laissez ce app use a la fin, il vient s'appliquer sur toutes les routes API que l'on a pas fait
app.use(function(req, res, next) {
    res.status(404);
    res.send(JSON.stringify({err: "Page introuvable"}));
});

app.listen(8080, () => {
    console.log('server listening on port  8080')
});