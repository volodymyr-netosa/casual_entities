import * as fs from 'fs';

export async function parseJsonEntityFile(absolutePath: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath, (err, buffer) => {
            if (err) return reject(err);
            let entity = JSON.parse(buffer.toString());
            resolve(entity);
        });
    });
}