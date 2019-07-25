const validEntity = {
    name: "string",
    age: "number"
};
const validBuffer = Buffer.from(JSON.stringify(validEntity));


export function readFile(path: string, cb: (err: any, data: any) => any, opt? : any) {
    if (path === 'validpath') cb(null, validBuffer);
    else cb(new Error('ENOENT'), null);
}

export function readdir(folderPath: string, cb: (err: any, data: any[]) => any, opt? : any) {
    switch (folderPath) {
        case 'emptyFolder':
            cb(null, [])
            break;
        case 'jsonOnlyFolder': 
            cb(null, ['Person.json', 'Book.json'])
            break;
        case 'mixedExtensionFolder':
            cb(null, ['asd.foo', 'Person.json'])
            break;
        case 'wrongFolderPath':
            cb(new Error('ENONT'), null)
            break;
        default:
            cb(null, []);
    }
}