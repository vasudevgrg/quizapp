const express= require("express");
const mongoose= require("mongoose");
const jwt= require("jsonwebtoken");
const cors= require("cors");


const app= express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

mongoose
  .connect(
    "mongodb+srv://vasudevgarg7:vasudevgarg7@cluster0.ucwxkxw.mongodb.net/"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });

const admin= mongoose.Schema({
    username: String,
    password: String, 
    token: String
});

const test= mongoose.Schema({
    testname: String,
    duration:Number,
    questions: Array
});

const secret= "secret";
let Admin= mongoose.model("Admin", admin);
let Test= mongoose.model("Test", test);

app.use(express.json());

const authenticate = (req, res, next) => {
    jwt.verify(req.headers.token, secret, (err, decoded) => {
      if (err) {
        res.status(404).send("invalid token");
      } else {
        next();
      }
    });
  };

  app.post("/admin/login",async (req, res)=>{
        const {username, password}= req.body;
        const check= Admin.findOne({username, password});

        if(check!= null){
            res.send({
                message: "valid user"
            });
        }else{
            res.status(403).send({
                message: "invalid user"
            })
        }
  });

  app.get("/admin/tests", async (req, res)=>{
    const tests= await Test.find();
    try{
    res.send({
        "tests": tests
    })
}catch{
    res.send({
        "message": "error to fetch"
    })
}
  });

  app.post("/admin/createtest", async (req, res)=>{
    console.log(req.body);
    const {testname,duration,  array}= req.body;
try{
    let test= new Test({
        testname: testname,
        duration: duration,
        questions: array
    });
    await test.save();
    const newtest= await Test.findOne({testname});
    res.send({
        message: "test created",
        id: newtest._id
    })
}catch{
    res.send("some error occured");
}
  });

  app.put("/admin/addquestion", async (req, res)=>{
    const {statement, option1, option2, option3, option4, correctOption}= req.body;
    const test= await Test.findOne({_id: req.headers.id});

    

    const {testname, duration, questions}= test;
    const updatedarray=[...questions,{statement, option1, option2, option3, option4,correctOption, id: Math.random()*100} ];
    
   const updatedtest= await Test.findOneAndUpdate({_id: req.headers.id}, {
            testname, duration,questions: updatedarray
    },{
        new : true
    });


const updated= await Test.findOne({_id: req.headers.id});

    res.send({
        "message":"value updated",
        "updated questions": updatedtest.questions,
        "updated array": updated
    })
  })



  app.listen(5002, () => console.log("listening to 5002"));