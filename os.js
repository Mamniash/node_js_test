const os = require('os');
const cluster = require('cluster');

// console.log(os.platform())
// console.log(os.arch());
// console.log(os.cpus().length);

if (cluster.isMaster) {
   for (let i = 0; i < 3; i++) {
      cluster.fork()
   }
   cluster.on('exit', (worker) => {
      console.log(`Worker with pid ${process.pid} is dead`);
      cluster.fork()
   })
} else {
   console.log(`ps with pid= ${process.pid}`);

   setInterval(() => {
      console.log(`ps with pid= ${process.pid} is still running`);
   }, 5000)
}

