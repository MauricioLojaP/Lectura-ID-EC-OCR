import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile } from './s3.js'
import mysql       from 'mysql';
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'DB_registros'
});


const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))


app.post('/files', async (req, res) => {
    let cedula=req.body.cedula;
    let nombre=req.body.nombre;
   
    const [result,url] = await uploadFile(req.files.file)
    let query = `INSERT INTO datos 
    (cedula, nombres,url) VALUES (?, ?, ?);`;

   
    // Creating queries
    connection.query(query, [cedula, 
    nombre,url], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
            + rows.insertId);
    });
    res.json({ cedula,nombre})
})

app.post('/user', async (req, res) => {

})

app.post('/register', async (req, res) => {

})

app.use(express.static('images'))

app.listen(3002)
console.log(`Server on port ${3002}`)