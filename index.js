'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const multer = require('multer');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://heralt:test@cluster0.w1kkt.mongodb.net/node-album?retryWrites=true&w=majority';
//const conn = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//create storage engine
const storage = new gridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //encrypt name before storage
            crypto.randomBytes(16,(err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'node-album'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({storage});

const url = uri;
const connect = mongoose.createConnection(url,
    {useNewUrlParser: true,
        useUnifiedTopology: true
    });
let gfs;
connect.once('open', ()=> {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "node-album"
    });
});



app.use(fileUpload({createParentPath: true})); //Enables files upload

//engine setup
app.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

app.use(cors())
    .use(express.static('./public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(morgan('dev'))
    .use(methodOverride('_method'));


//Dit is middleware
app.get('/', (req, res) => {
    res.render('pages/home');
});

app.post('/upload', upload.single('picture'),(req,res) => {
    console.log(req.files);
    //expressUpload(req,res);
    res.redirect('/')
})

app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));

function expressUpload(req,res){
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let picture = req.files.picture;
            console.log(picture.name);
            upload.single()
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            /*picture.mv('./uploads/' + picture);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: picture.name,
                    mimetype: picture.mimetype,
                    size: picture.size
                }
            });*/
        }
    } catch (err) {
        res.status(500).send(err);
    }
}