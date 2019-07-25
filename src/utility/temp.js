let x = {
    name: 'string',
    age: 'number'
}

console.log(Object.keys(x));
for (let prop of Object.keys(x)) {
    console.log(prop);
    console.log(x[prop]);
}