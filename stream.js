const fs = require('fs');
const path = require('path');
const { Stream } = require('stream');

//!читать полностью

// fs.readFile(path.resolve('file.txt'), (err, data) => {
//    if (err) {
//       throw err;
//    }

//    console.log(data);
// })

//!read for streams

// const stream = fs.createReadStream(path.resolve('file.txt'))

// stream.on('data', (chunk) => {
//    console.log(chunk);
// })

// stream.on('end', () => console.log('end'))
// stream.on('open', () => console.log('open'))
// stream.on('error', (err) => console.log(err))

// const writableStream = fs.createWriteStream(path.resolve('file2.txt'))

// for (let i = 0; i < 20; i++) {
//    writableStream.write(i + '\n')
// }
// writableStream.end()
// // writableStream.close()
// // writableStream.destroy()
// writableStream.on('error', (err) => console.log(err))

const http = require('http');
http.createServer((req, res) => {
   //req - read stream
   //res - write stream
   //res.write()

   const stream = fs.createReadStream(path.resolve('file3.txt'))

   // stream.on('data', chunk => res.write(chunk))
   // stream.on('end', () => res.end())
   // !stream end before then user finish his download

   stream.pipe(res)
})