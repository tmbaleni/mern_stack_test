// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';

//import models
import Articles from '../model/article.server.model';

//get articles all from '/api/'
export const getArticles = (req,res) => {
    //find all articles in database
    Articles.find().exec((err,articles) => {
      if(err){
      //return error or    
      return res.json({'success':false,'message':'Some Error'});
      }
      //return succes and articles
  return res.json({'success':true,'message':'Articles fetched successfully',articles});
    });
  }
//post article all from '/api/'
export const addArticle = (req,res) => {
    //extract params from body into schema
    const newArticle = new Articles(req.body);
    //add to database
    newArticle.save((err,article) => {
      if(err){
        //retun error
      return res.json({'success':false,'message':'Some Error'});
      }
       //return succes
  return res.json({'success':true,'message':'Article added successfully',article});
    })
}
//PUT: update an article by id /api/
export const updateArticle = (req,res) => {
    //find and update from body params
    Articles.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error','error':err});
      }
      console.log(article);
      return res.json({'success':true,'message':'Updated successfully',article});
    })
}
//GET find article by id /api/8099
export const getArticle = (req,res) => {
    Articles.find({_id:req.params.id}).exec((err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
      //if article length is greater than 0 return article
      if(article.length){
        return res.json({'success':true,'message':'Article fetched by id successfully',article});
      }
      else{
        return res.json({'success':false,'message':'Article with the given id not found'});
      }
    })
}
//DELETE delete an article by id /api/89099
export const deleteArticle = (req,res) => {
    Articles.findByIdAndRemove(req.params.id, (err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
  return res.json({'success':true,'message':article.bodyText+' deleted successfully'});
    })
}