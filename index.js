'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const crypto = require('crypto');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');

//
const album = require('./modules/jsonManipulation');

const app = express();
const port = 3000;

//engine setup
app.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(methodOverride('_method'))
    .use(express.static('./public'));

const uri = 'mongodb+srv://heralt:test@cluster0.w1kkt.mongodb.net/node-album?retryWrites=true&w=majority';

//create mongo connection
const conn = mongoose.createConnection(uri,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//init gfs
let gfs;

conn.on('connecting', () => {
    console.log('connecting to MongoDB...');
});

conn.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

conn.on('connected', function() {
    console.log('MongoDB connected!');
});

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('pictures');
    console.log('database geopend');
});

conn.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
conn.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect(uri, {server:{auto_reconnect:true}});
});
mongoose.connect(uri, {server:{auto_reconnect:true}});

function reconnect() {
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('pictures');
        console.log('reconnected');
    });
}

//create storage engine
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'pictures'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage});

app.get('/', (req, res) => {
    let albumData = album.getAlbums();
    gfs.files.find().toArray((err, files) => {
        //check if files exist
        if (!files || files.length === 0) {
            if (albumData.length > 0) {
                res.render('pages/home', {files: false, albums: albumData});
            } else {
                res.render('pages/home', {files: false, albums: false});
            }
        } else {
            files.map(file => {
                let meta = album.getMeta(file.filename);
                if (file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png') {
                    file.isImage = true;
                    if (typeof meta !== 'undefined') {
                        file.beschrijving = meta.beschrijving;
                    } else {
                        file.beschrijving = '';
                    }
                } else {
                    file.isImage = false;
                }
            });
            res.render('pages/home', {files: files, albums: albumData});
        }
    });
});

app.post('/upload', upload.single('picture'), (req, res) => {
    res.redirect('/');
});

app.get('/createAlbum', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        files.map(file => {
            let meta = album.getMeta(file.filename);
            if (file.contentType === 'image/jpeg' ||
                file.contentType === 'image/png') {
                file.isImage = true;
                if (typeof meta !== 'undefined') {
                    file.beschrijving = meta.beschrijving;
                } else {
                    file.beschrijving = '';
                }
            } else {
                file.isImage = false;
            }
        });
        res.render('pages/createAlbum', {files: files});
    });
});

app.post('/createAlbum', (req, res) => {
    album.createAlbum(req.body);
    res.redirect('/');
});

app.get('/album/:id', (req, res) => {
    let albumData = album.getAlbums();
    let albumId = req.params.id;
    let chosenAlbum = album.getAlbum(albumId);
    res.render('pages/album', {albums: albumData, thisAlbum: chosenAlbum});
});

//Go to image meta screen
app.get('/imageMeta/:filename', (req, res) => {
    let albumData = album.getAlbums();
    let file = req.params.filename;
    if (file !== 'image') {
        res.render('pages/picture', {file: file, albums: albumData});
    }

});

//Add meta data to image json file
app.post('/imageMeta', (req, res) => {
    album.addImagetoAlbum(req.body);
    res.redirect('/');
});

//display all files in json
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //check if files exist
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files);
    });
});

//display single file data
app.get('/files/:filename', (req, res) => {
    console.log('hier');
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(file);
    });
});

//get single image
app.get('/image/:filename', (req, res) => {

    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        //check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            //read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'not an image'
            });
        }
    });
});

// @route DELETE /files/:id
// @desc Delete file
app.delete('/files/:filename', (req, res) => {
    if (gfs) {
        gfs.remove({filename: req.params.filename, root: 'pictures'}, (err, gridStore) => {
            if (err) {
                return res.status(404).json({err: err});
            }
            album.deleteImage(req.params.filename);
            res.redirect('/');
        });
    } else {
        res.redirect(404, '/');
    }
});

app.post('/delete/:albumId',(req, res) => {
    let albumDelete = req.params.albumId;
    album.deleteAlbum(albumDelete);
    res.redirect('/');
});

app.post('/slideshow',(req, res) => {
    const files = JSON.parse(req.body.images);
    res.render('pages/slideshow',{files:files});
});

app.post('/jsSlideshow',(req, res) => {
    const files = JSON.parse(req.body.images);
    res.render('pages/jsslideshow',{files:files});
});

app.post('/drop',(req,res)=>{
    album.addImagetoAlbum(req.body)
    res.redirect('/');
})

app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));


