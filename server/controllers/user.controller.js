const config = require("../configs/auth.config");
const db = require("../models");
const User = db.user;
const Intern = db.interns;
const _=require('lodash');
const mongoose = require('mongoose');
const firebase = require('../configs/firebase.config');
const {format} = require('util');
const { v4: uuidv4 } = require('uuid');
function uploadFile(file){
    if(!file) {
        return 0;
    } 
    const blob = firebase.bucket.file(file.originalname)
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4()
              }
        }
    })
    blobWriter.on('error', (err) => {
        // res.status(500).send("Failed to uplad CV");
        return -1;
    })
    blobWriter.end(file.buffer);

    const publicUrl = format(
        `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${uuidv4()}`
      );
    return publicUrl;
}
exports.addIntern=(req,res)=>{
    const publicUrl = uploadFile(req.file);
    if(publicUrl===0){
        res.status(400).send("The request do not include cv file");
    }
    else if(publicUrl===-1){
        res.status(500).send("Failed to uplad CV");
    }
        const intern= new Intern({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        year: parseInt(req.body.year),
        major: req.body.major,
        startDay: req.body.startDay,
        endDay: req.body.endDay,
        result: req.body.result==='true',
        cv: publicUrl
    });
    // console.log(intern)
    intern.save((err,item)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send({ message: "Intern was added successfully!",data: item})
    });
    
}

exports.retriveInterns=(req,res)=>{
    Intern.find({},(err,result)=>{
        if(err) res.status(500).send({ message: err });
        res.status(200).send({ message: "Interns were taken successfully!",data: result})
    })
}

exports.retriveUser=(req,res)=>{
    const id = mongoose.Types.ObjectId(_.capitalize(req.params.id));

    User.findOne({_id:id},(err,result)=>{
        if(err) res.status(500).send({ message: err });
        if(!result){
            res.status(404).send({ message: "User was not in database" });
            return;
        }
     
        const data={
            username:result.username,
            email:result.email,
            phone:result.phone
        }
 
        res.status(200).send({ message: "User were taken successfully!",data: data})
    })
}

exports.retriveIntern=(req,res)=>{
    const id = mongoose.Types.ObjectId(_.capitalize(req.params.id));
    Intern.findOne({_id:id},(err,result)=>{
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!result){
            res.status(404).send({ message: "Intern was not in database" });
            return;
        }
        res.status(200).send({ message: "Intern was retrived successfully!",data: result})
    })
}

exports.deleteIntern=(req,res)=>{
    const id = mongoose.Types.ObjectId(_.capitalize(req.params.id));
        Intern.findOneAndRemove({_id:id},(err)=>{
            if(err)  res.status(500).send({ message: err });
            else res.status(200).send({ message: "Your note was deleted successfully!" });
        });
    }
exports.updateIntern=(req,res)=>{
    const id = mongoose.Types.ObjectId(_.capitalize(req.params.id));
    var data={};
    if(req.file){
        const publicUrl = uploadFile(req.file);
        if(publicUrl===0){
            res.status(401).send("The request do not include cv file");
        }
        else if(publicUrl===-1){
            res.status(500).send("Failed to uplad CV");
        }
        data={"cv":publicUrl};
    }
    else{
        data=JSON.parse(JSON.stringify(req.body))
    }
    Intern.findOneAndUpdate({_id:id},{[Object.keys(data)[0]]:data[Object.keys(data)[0]]}).then(()=>{
        res.status(200).send({message: "Updated successfully",data:{[Object.keys(data)[0]]:data[Object.keys(data)[0]]}});
    },err=>{
        res.status(500).send({ message: err });
    })
    
};

exports.updateUser=(req,res)=>{
    const id = mongoose.Types.ObjectId(_.capitalize(req.params.id));
    const data=req.body;
    User.findOneAndUpdate({_id:id},data).then((result)=>{
        res.status(200).send({message: "Updated successfully",data: result});
    },err=>{
        res.status(500).send({ message: err });
    })
}
