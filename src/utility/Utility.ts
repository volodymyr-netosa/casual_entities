import * as fs from 'fs';
import * as path from 'path';

export async function parseJsonEntityFile(absolutePath: string) {
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

export async function getJsonFilesInFolder(folderPath: string) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) return reject(err);
            let jsonFiles = files.filter((value) => value.match(/.json$/));
            resolve(jsonFiles);
        })
    })
}

export async function getEntitiesFromFolder(folderPath: string) {
    return getJsonFilesInFolder(folderPath).then((fileNames: any[]) => {
        const entityPromices: any[] = []
        fileNames.forEach(
            (name: string) => {
                entityPromices.push(
                    parseJsonEntityFile(path.resolve(folderPath, name))
                )
            }
        );
        return Promise.all(entityPromices);
    }).then((entitiesData) => {
        let entities = new Map();
        for (let data of entitiesData) {
            entities.set(data.entityName, data.entity);
        }
        return entities;
    })
}

function getFileNameFromPath(path: string): string {
    return path.replace(/^.*[\\\/]/, '');
};

function removeExtension(fileName: string): string {
    return fileName.split('.').slice(0, -1).join('.');
}