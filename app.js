const express = require("express")
const app=express();
const path = require('path');
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');

const { SocketAddress } = require("net");
// mongoose.connect('mongodb://127.0.0.1:27017/Contactdance');
mongoose.connect('mongodb://127.0.0.1:27017/Feedback');
const port=80;

//Definde mogoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
  });
  const feedbackSchema= new mongoose.Schema({
    feedback:String
  });

const Contact = mongoose.model('Contact', contactSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static' , express.static('static'));
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
app.get("/About",(req,res)=>{
    const params = {}
    res.status(200).render('about.pug',params);
})
app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("data saved successfully")
    }).catch(()=>{
       res.status(400).send("data does not saving failed")
    })
    // res.status(200).render('contact.pug');
});
app.post("/About",(req,res)=>{
    var newdata = new Feedback(req.body);
    newdata.save().then(()=>{
        res.send("data saved successfully")
    }).catch(()=>{
       res.status(400).send("data does not saving failed")
    })
    // res.status(200).render('contact.pug');
});


app.listen(port,()=>{
    console.log(`The application started succefully on port ${port}`);
})
