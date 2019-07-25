const fs = require('fs');
const path = require('path');

async function parseJsonEntityFile(absolutePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath, (err, buffer) => {
            if (err) return reject(err);
            let entity = JSON.parse(buffer.toString());
            let entityName = removeExtension(getFileNameFromPath(absolutePath));
            resolve({
                entity,
                entityName
            });
        });
    });
}

async function getJsonFilesInFolder(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) return reject(err);
            let jsonFiles = files.filter((value) => value.match(/.json$/));
            resolve(jsonFiles);
        })
    })
}

async function getEntitiesFromFolder(folderPath) {
    return getJsonFilesInFolder(folderPath).then((fileNames) => {
        const entityPromices = []
        fileNames.forEach(
            (name) => {
                entityPromices.push(
                    parseJsonEntityFile(path.resolve(folderPath, name))
                )
            }
        );
        return Promise.all(entityPromices);
    }).then((entitiesData) => {
        let entities = [];
        for (let data of entitiesData) {
            entities.push({name: data.entityName, props:data.entity});
        }
        return entities;
    })
}

function getFileNameFromPath(path) {
    return path.replace(/^.*[\\\/]/, '');
};

function removeExtension(fileName) {
    return fileName.split('.').slice(0, -1).join('.');
}

module.exports = {
    getEntitiesFromFolder
}