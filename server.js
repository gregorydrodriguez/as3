const legoData = require("./modules/legoSets");

const express = require('express');
const app = express();
const path = require('path');

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.send('Assignment 3:  Gregory Rodriguez - 127880227');
    const pathToFile = path.join(__dirname, '/views', '/home.html');
    res.sendFile(pathToFile);
});

app.get('/about', (req, res) => {
    const pathToFile = path.join(__dirname, '/views', '/about.html');
    res.sendFile(pathToFile);
});

app.get("/lego/sets", async (req,res)=>{
  let sets = await legoData.getAllSets();
  res.send(sets);
});

// app.get("/lego/sets/id-demo", async (req,res)=>{
//   try{
//     let set = await legoData.getSetByNum("001-1");
//     res.send(set);
//   }catch(err){
//     res.send(err);
//   }
// });

app.get("/lego/sets/technic", async (req,res)=>{
  try{
    let sets = await legoData.getSetsByTheme("tech");
    res.send(sets);
  }catch(err){
    res.send(err);
  }
});

app.get("/lego/sets/creator", async (req,res)=>{
  try{
    let sets = await legoData.getSetsByTheme("creator");
    res.send(sets);
  }catch(err){
    res.send(err);
  }
});
app.get("/lego/sets/basic-set", async (req,res)=>{
  try{
    let sets = await legoData.getSetsByTheme("basic set");
    res.send(sets);
  }catch(err){
    res.send(err);
  }
});

app.get("/lego/sets/:theme", async (req,res)=>{
  const theme = req.params.theme;
  try{
    let sets = await legoData.getSetsByTheme(theme);
    res.send(sets);
  }catch(err){
    res.send(err);
  }
});

app.get("/lego/set/:id", async (req,res)=>{
  const id = req.params.id;
  try{
    let set = await legoData.getSetByNum(id);
    res.send(set);
  }catch(err){
    res.send(err);
  }
});

app.get('*', (req, res) => {
  const pathToFile = path.join(__dirname, '/views', '/404.html');
  res.status(404).sendFile(pathToFile);
});

legoData.initialize().then(()=>{
  app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
});