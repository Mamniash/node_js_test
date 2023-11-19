const http = require('http');
const events = require('events');

module.exports = class App {
   constructor() {
      this.emitter = new events();
      this.server = this._createServer()
      this.middlewares = []
   }

   use(middleware) {
      this.middlewares.push(middleware)
   }

   listen(port, callback) {
      this.server.listen(port, callback);
   }

   addRouter(router) {
      Object.keys(router.endpoints).forEach(path => {
         const endpoint = router.endpoints[path];
         Object.keys(endpoint).forEach((method) => {
            this.emitter.on(this._getMast(path, method), (req, res) => {
               const handler = endpoint[method]
               handler(req, res)
            })
         })
      })
   }

   _createServer() {
      return http.createServer((req, res) => {
         let body = ""
         req.on('data', (chunk) => {
            body += chunk
         })
         req.on('end', () => {
            if (body) {
               req.body = JSON.parse(body);
            }

            this.middlewares.forEach(middleware => middleware(req, res))
            const emitted = this.emitter.emit(this._getMast(req.pathname, req.method), req, res)
            if (!emitted) {
               res.end()
            }
         })
      })
   }

   _getMast(path, method) {
      return `[${path}]:[${method}]`
   }
}