import express from "express";
import multer from "multer";
import cors from "cors";
import fs from 'fs';

import findChattiest from "./findChattiest.js";

const app = express();
const upload = multer({ dest: "uploads/" }); // Specify the destination folder for uploaded files

app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("File Uploader");
});

app.get("/json", (req, res) => {
  res.json({ files: req.files });
});

app.post("/api/upload", upload.array("files"), (req, res) => {
  // Access the uploaded files via req.files
  console.log(req.files);

  const uploadedFiles = req.files;
  const chattiestUsers = findChattiest(uploadedFiles); 

  
  uploadedFiles.forEach((file) => {
    fs.unlinkSync(file.path);
  }); // Delete the uploaded files


  res.json({ chattiestUsers });

});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export { app };
