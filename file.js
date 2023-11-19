const path = require('path');
const fs = require('fs');
const { error } = require('console');
const { rejects, ifError } = require('assert');

//fs.mkdirSync(path.resolve('dir1', "dir2", 'dir3'), { recursive: true })


// console.log('start');
// fs.mkdir(path.resolve('dir1', 'dir2', 'dir3'), (err) => {
//    if (err)
//       console.log(err);
//    else
//       console.log('Dirs are created');
// })
// console.log('end');

// fs.rmdir(path.resolve("dir"), (err) => {
//    if (err)
//       throw err;
// })

// fs.writeFile(path.resolve('test.txt'), "some data in file", (err) => {
//    if (err) {
//       throw err
//    }
// })

const writeFileAsync = async (path, data) => {
   return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
         if (err) {
            return reject(err.message)
         }
         resolve()
      })
   })
}

const appendFileAsync = async (path, data) => {
   return new Promise((resolve, reject) => {
      fs.appendFile(path, data, (err) => {
         if (err) {
            return reject(err.message)
         }
         resolve()
      })
   })
}

const readFileAsync = async (path) => {
   return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
         if (err) {
            return reject(err.message)
         }
         resolve(data)
      })
   })
}

const removeFileAsync = async (path) => {
   return new Promise((resolve, reject) => {
      fs.rm(path, { encoding: 'utf-8' }, (err) => {
         if (err) {
            return reject(err.message)
         }
         resolve()
      })
   })
}

writeFileAsync(path.resolve('text2.txt'), 'some data')
   .then(() => appendFileAsync(path.resolve('text2.txt'), '234'))
   .then(() => appendFileAsync(path.resolve('text2.txt'), '222222'))
   .then(() => appendFileAsync(path.resolve('text2.txt'), '4'))
   .then(() => appendFileAsync(path.resolve('text2.txt'), '4'))
   .then(() => readFileAsync('text2.txt'))
   .then(data => console.log(data))
   .then(() => removeFileAsync(path.resolve('text2.txt')))
   .then(() => console.log('file was removed'))
   .catch(err => {
      if (err) {
         throw err
      }
   })

//tast

const text = process.env.TEXT || 'some text'
console.log(text);
writeFileAsync(path.resolve('text.txt'), text)
   .then(() => readFileAsync(path.resolve('text.txt')))
   .then(data => data.split(' ').length)
   .then(count => writeFileAsync(path.resolve('conut.txt'), `count words in text is ${count}`))
   .then((err) => {
      if (err) console.log(err);
   })