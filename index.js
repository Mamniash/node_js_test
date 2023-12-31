const App = require('./framework/App');
const userRouter = require('./src/user-router');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const app = new App();

app.use(jsonParser)
app.use(parseUrl('http://localhost:5000'))

app.addRouter(userRouter)



const start = async () => {
   try {
      await mongoose.connect('mongodb+srv://user:123@cluster0.cdjkrhr.mongodb.net/?retryWrites=true&w=majority')
      app.listen(PORT, () => {
         console.log('server has started on ' + PORT);
      })
   } catch (e) {
      console.log(e);
   }
}

start()
