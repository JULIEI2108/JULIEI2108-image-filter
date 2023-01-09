import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { request } from 'http';
import { Request, Response } from "express";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT`
  // GET /filteredimage?image_url={{URL}}
  app.get("/filteredimage/", async (req: Request, res: Response) => {
    let { image_url } = req.query;
    // Return error if there is no url input
    console.log(image_url);
    if (!image_url) {
      return res.status(400).send('URL is required');
    }
    // Pass URL in filterImageFromURL function
    let result = filterImageFromURL(image_url.toString());
    // Return error if url is not valid image url
    result.catch((response: string) => {
      return res.status(400).send("Not a valid Image URL");
      // Return filtered image
    }).then((response) => {
      res.status(200).sendFile(response.toString());
      // Check is sendfile is compelete 
      res.on('finish', function () {
        // Delete file
        var responses = [];
        responses.push(response.toString());
        deleteLocalFiles(responses);
      })

    })

  });
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
