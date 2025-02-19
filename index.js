import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')))

app.get("/", function(req, res){
    fs.readdir(`./files`, function(err, files){
        console.log(files);
        res.render("index" , {files:files});
    })

});
// app.post("/create", function(req, res){ 
//   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    
//     res.redirect("/")
   
//   });
// });
app.post("/create", function(req, res){ 
    if (!req.body.title || !req.body.details) {
      return res.status(400).send("Missing title or details");
    }
    
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.details, function(err){
      if (err) {
        return res.status(500).send("Error writing file");
      }
      res.redirect("/")
    });
  });
//   app.post('/toggle/:filename', function(req, res){
//     // Implement toggle logic here
//     res.redirect("/");
// });
  app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err , filedata){
        const x = req.params.filename.split('_').join(' ');
        const y = x.split('.txt').join('');
     res.render('show',{filename: y, filedata:filedata});
    })
  });

  // Add a new route for deleting files
app.post('/delete/:filename', function(req, res){
    const filename = req.params.filename;
    fs.unlink(`./files/${filename}`, function(err){
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect("/");
    });
});

app.listen(3000, function(err){
    if(err)throw err;
    else console.log("server is connected");
});

