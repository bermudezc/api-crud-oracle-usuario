
// https://www.youtube.com/watch?v=kH4UbdlBZHs&list=PLrAw40DbN0l0CtcIRNmM5ZTM6o8Nmwdk5&index=2


const oracledb = require('oracledb')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

oracledb.autoCommit = true;

app.use( cors({ origin: true, credentials: true  }) );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

var connectionProperties = {
  user: "carlos",
  password: "carlos",
  connectString:  "10.173.97.191:1521/orclcdb"
};

function doRelease(connection) {
    connection.release(function (err) {
      if (err) {
        console.error(err.message);
      }
    });
  }

app.get('/usuarios/', (req, res)=>{  
  oracledb.getConnection(connectionProperties,  (err, connection) => {        
    connection.execute("SELECT * FROM usuario",{},
      { outFormat: oracledb.OBJECT },
      (err, result) => {
            res.json(result.rows);
            doRelease(connection);
      });
  });
});

app.get('/usuario/:campo/:clave', (req, res)=>{
    oracledb.getConnection(connectionProperties,(err,connection)=>{
        clave=req.params.clave
        campo=req.params.campo        
        connection.execute("select * from usuario where "+ campo +" = :clave",[clave],
        { outFormat: oracledb.OBJECT },
        (err, result) => {
            res.json(result.rows);
            doRelease(connection);
        });        
    })
})

app.post('/usuario/',  (req, res)=>{
    oracledb.getConnection(connectionProperties,  (err, connection)=>{
        const body = req.body        
        connection.execute("insert into usuario (nombre, pass) values (:nombre,:pass)",
        [body.nombre, body.pass], (err,result)=>{
            res.end()
            doRelease(connection)
        })
    })    


})

app.delete('/usuario/:id', (req, res)=>{
    oracledb.getConnection(connectionProperties, (err, connection) => {
        id=req.params.id        
        connection.execute("delete from usuario where id=:id", [id] ,
        (err, result) => {            
            res.end()
            doRelease(connection)
        })
    })
})

app.put('/usuario/:id', (req, res)=>{
    oracledb.getConnection(connectionProperties,  (err, connection) => {
        id=req.params.id
        nombre=req.body.nombre
        pass=req.body.pass
        connection.execute("update usuario set nombre=:nombre, pass=:pass where id=:id",
        [nombre,pass,id],
        (err, result)=>{
            res.end()
            doRelease(connection)
        })
    })
})

app.listen(3000)

