const express= require("express");
const DBConnection= require("./config/db");

const app= express();

const port=5000;

DBConnection();

app.use(express.json({ extended : false}));

// app.get("/",(req,res)=>{
//     res.send("This is for app get");
// })

// app.post("/reg",(req,res)=>{
//     res.send("Register Page..!!!");
// })

// app.put("/keeping",(req,res)=>{
//     res.json({name:"Ravi Kiran"})
// })

app.use("/api/person",require("./routes/person"));

app.listen(port,()=>
    console.log(`server running on ${port}`)
);