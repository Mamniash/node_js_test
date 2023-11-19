const Emitter = require('events');

const emitter = new Emitter();

emitter.on('message', (data, second, third) => {
   console.log('massage ' + data);
   console.log('second ' + second);
})

const MESSAGE = process.env.message || ''

if (MESSAGE) {
   emitter.emit('message', MESSAGE, 123, 11111)
} else {
   emitter.emit('message', 'some message', 0, 0)
}
