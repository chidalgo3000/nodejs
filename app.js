var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var app = express();

var jwtClave = "laclave_de_cecilio";
app.use(express.static('publica'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressJwt({
    secret: jwtClave
}).unless({
    path: ["/login"]
}));

var usuario = {
    nombre: "cecilio",
    clave: "cecilio"
}
var noticias = [{
    id: 1,
    titulo: "noticia 1"
}];

app.get('/noticias', function(req, res) {
    res.send(noticias);
});


app.post("/login", function(req,res) {

  var user=req.body.nombre;
  var password=req.body.clave;
  console.log("User name = "+user+", password is "+password);

    if (user == usuario.nombre || password == usuario.clave) {

        var token = jwt.sign({
            usuario: "cecilio"
        }, jwtClave);

        res.send(token);

    } else {

        res.status(401).end("usuario incorrecto")
    }

});

app.listen(3000, function() {
    console.log('aplicacion en el puerto 3000!');
});
