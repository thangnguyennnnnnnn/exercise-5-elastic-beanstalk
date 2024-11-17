import bodyParser from 'body-parser';
import express from 'express';
import { router as imageRoutes } from './routes/imageRoutes.js';
import { router as tweetRoutes } from './routes/tweetRoutes.js';
import dotenv from 'dotenv';

(async () => {
  dotenv.config();

  console.log('AWS_S3_BUCKET_NAME:', process.env['AWS_S3_BUCKET_NAME']);
  console.log('AWS_ACCESS_KEY_ID:', process.env['AWS_ACCESS_KEY_ID']);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env['AWS_SECRET_ACCESS_KEY']);
  console.log('AWS_REGION:', process.env['AWS_REGION']);

  //Create an express application
  const app = express(); 
  //default port to listen
  const port = process.env.PORT || 8080; 
  
  //use middleware so post bodies are accessable as req.body
  app.use(bodyParser.json()); 
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

  // Root URI call
  app.get( "/", ( req, res ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  app.use(tweetRoutes)
  app.use(imageRoutes)

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
