const path = require('path')
console.log(path.join(__dirname, '..'));

console.log(path.parse(path.join(__dirname, '..')));

const siteUrl = 'http://localhost:8880/user?id=2342'

const url = new URL(siteUrl);

console.log(url);