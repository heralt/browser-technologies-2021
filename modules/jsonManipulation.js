'use strict';
const fs = require('fs');

const albumJson = './modules/jsonFiles/albums.json';
const imageMetas = './modules/jsonFiles/fotoMeta';

function readAlbums() {
    let text = fs.readFileSync(albumJson, 'utf8');
    text = JSON.parse(text);
    return text;
}

function readMeta() {
    let text = fs.readFileSync(imageMetas, 'utf8');
    text = JSON.parse(text);
    return text;
}

function makeString(json) {
    return JSON.stringify(json, null, 2);
}

function writeToFile(jsonString, file) {
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
}

function getAlbums() {
    let text = readAlbums();
    let albumData = text['albums'].map(album => ({
        id: album.id,
        name: album.name
    }));
    return albumData;
}

function createAlbum(album) {
    let id = Math.random().toString(36).substr(2, 9);
    let albumData;
    if (!album.image) {
        albumData = {
            "id": id,
            "name": album.albumName,
            "photos": []
        };
    } else {
        albumData = {
            "id": id,
            "name": album.albumName,
            "photos": []
        };
        if (album.image.length > 1 && typeof album.image === "object") {
            album.image.forEach(image => {
                albumData["photos"].push({"img": image});
            });
        } else {
            albumData["photos"].push({"img": album.image});
        }
    }

    fs.readFile(albumJson, 'utf8', ((err, json) => {
            if (err) {
                console.log("file read failed: ", err);
                return;
            }
            try {
                const album = JSON.parse(json);
                album['albums'].push(albumData);
                const jsonString = makeString(album)
                writeToFile(jsonString, albumJson);
            } catch (err) {
                console.log('Error parsing JSON string:', err);
            }
        })
    );
}

function getAlbum(id) {
    let albums = readAlbums();

    let found = albums['albums'].find(item => {
        return item.id === id;
    });
    let albumData = {name: found.name, photos: found['photos']};
    return albumData;
}

function addToAlbum(metaData) {
    if (metaData.albums) {
        addImageToAlbum(metaData.albums, metaData.image)
    }
    addMetaToImage(metaData);
}

//write metadata to json
function addMetaToImage(metaData) {
    let imageMetaData = readMeta();
    let data = {
        "img": metaData.image,
        "beschrijving": metaData.beschrijving,
        "locatie": metaData.locatie,
        "fotograaf": metaData.fotograaf
    }
    let found = imageMetaData['foto-meta'].find(meta => {
        return meta.img === metaData.image
    });
    if (typeof found !== 'object') {
        imageMetaData['foto-meta'].push(data);
        const jsonString = makeString(imageMetaData);
        writeToFile(jsonString, imageMetas);
    } else {

    }
}

function addImageToAlbum(albumID, imageName) {
    let albums = readAlbums();
    let image = {"img": imageName};
    let found = albums['albums'].find(album => {
        return album.id === albumID;
    });
    found['photos'].push(image);
    const jsonString = makeString(albums);
    writeToFile(jsonString, albumJson);
}

function getMeta(filename) {
    let meta = readMeta();
    return meta['foto-meta'].find(image => {
        if (image.img === filename && image.beschrijving !== 'undefined') {
            return image;
        }
    });
}

function deleteImage(filename) {
    deleteMeta(filename);
    deleteFromAlbum(filename);
}

function deleteFromAlbum(filename) {
    let album = readAlbums();

    for (let photos in album['albums']) {
        album['albums'][photos].photos = album['albums'][photos].photos.filter(elem => {
            return elem.img !== filename
        });
    }

    const jsonString = makeString(album);
    writeToFile(jsonString, albumJson);
}

function deleteMeta(filename) {
    let meta = readMeta();
    meta['foto-meta'] = meta['foto-meta'].filter(meta => meta.img !== filename);
    const jsonString = makeString(meta);
    writeToFile(jsonString, imageMetas);
}

function deleteAlbum(albumId) {
    let albums = readAlbums();
    albums['albums'] = albums['albums'].filter(album => album.id !== albumId);
    const jsonString = makeString(albums);
    writeToFile(jsonString, albumJson);
}

module.exports = {
    createAlbum, getAlbums, getAlbum, addImagetoAlbum: addToAlbum, getMeta, deleteImage, deleteAlbum
}