const express = require("express");
const mongoose =require("mongoose");
const Person = require("../models/Person");
const router = express.Router();
const {check, validationResult} = require("express-validator");

// router.get("/all",(req,res)=>{
//     res.send("Person get from router side");
// });

router.post("/",
[
    check("firstname","first name is Required").not().isEmpty(),
    check("secondname","Second Name is Req").not().isEmpty()
]
,(req,res)=>{

    const errs= validationResult(req);
    if(! errs.isEmpty()){
        return res.status(400).json(errs.array());
    }

    const {firstname,secondname} = req.body;
    // const firstname= req.body.firstname;
    // const secondname = req.body.secondname;

    let person = new Person({
        firstname : firstname,
        secondname : secondname,
    });

    person
        .save()
        .then((per) => res.json(per))
        .catch((err) =>{
            console.log(err.message);
            return res.status(500).json({error : "Internal Server Error"});
        });

    // res.send(firstname);
});
 router.get("/all",(req,res)=>{
     Person.find()
     .then((persons)=> res.json(persons))
     .catch((err)=>{
         console.log(err.message);
         res.status(500).send("Server Error");
     });
 });

 router.delete("/:id",(req,res)=>{
     Person.findById(req.params.id)
     .then(()=>{
         Person.findByIdAndRemove(req.params.id)
         .then(()=>res.json({ msg: "Deletion Successful"}))
         .catch((err)=>{
             console.log("Deletion Failed");
              res.status(500).send("Server Error");
         });
     })
     .catch((err)=>  res.status(404).json({ error: "Person not found" }));
 });

 router.put("/:id", async(req,res) =>{
     const {firstname,secondname} =req.body;
     let person={};
     if(firstname) person.firstname=firstname;
     if(secondname) person.secondname=secondname;

     try{
         let personId = await Person.findById(req.params.id);
         if(! personId) return res.status(404).json({ error: "person not found"});

         let updatedPerson = await Person.findByIdAndUpdate(
             req.params.id,
             { $set : person},
             { new : true}
         );
         res.json(updatedPerson);
     }
     catch(err){
         console.log("Error in updating");
         res.sendStatus(500).json({ error : "Server Error"});
     }
 })

module.exports = router;