import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import bb from 'express-busboy';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';

// import routes
import articleRoutes from './routes/article.server.route';
// define our app using express
const app = express();

// express-busboy to parse multipart/form-data
bb.extend(app);

// allow-cors
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

// set the port
const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-ubjo9.mongodb.net:27017,cluster0-shard-00-01-ubjo9.mongodb.net:27017,cluster0-shard-00-02-ubjo9.mongodb.net:27017/express?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
  useMongoClient: true,
});

// add Source Map Support
SourceMapSupport.install();

app.use('/api', articleRoutes);
app.get('/', (req,res) => {
  return res.end('Api working');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
