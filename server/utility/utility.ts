const fs = require('fs');
const path = require('path');

export async function parseJsonEntityFile(absolutePath:string): Promise<{entity: {}, entityName: string}> {
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath, (err: any, buffer: Buffer) => {
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

export async function getJsonFilesInFolder(folderPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err: any, files: string[]) => {
            if (err) return reject(err);
            let jsonFiles = files.filter((value) => value.match(/.json$/));
            resolve(jsonFiles);
        })
    })
}

export async function getEntitiesFromFolder(folderPath: string): Promise<{name:string, props:{}}[]> {
    return getJsonFilesInFolder(folderPath).then((fileNames) => {
        const entityPromices: Promise<{entity: {}, entityName: string}>[] = []
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

function getFileNameFromPath(path:string): string {
    return path.replace(/^.*[\\\/]/, '');
};

function removeExtension(fileName:string): string {
    return fileName.split('.').slice(0, -1).join('.');
}
