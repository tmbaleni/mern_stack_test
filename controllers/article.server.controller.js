// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';

//import models
import Todo from '../models/article.server.model';

export const getArticles = (req,res) => {
    Articles.find().exec((err,articles) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
  return res.json({'success':true,'message':'Articles fetched successfully',articles});
    });
  }

export const addArticle= (req,res) => {
    const newArticle = new Article(req.body);
    newArticle.save((err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
  return res.json({'success':true,'message':'Article added successfully',article});
    })
}

export const updateArticle = (req,res) => {
    Todo.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error','error':err});
      }
      console.log(article);
      return res.json({'success':true,'message':'Updated successfully',article});
    })
}

export const getArticle = (req,res) => {
    Todo.find({_id:req.params.id}).exec((err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
      if(article.length){
        return res.json({'success':true,'message':'Article fetched by id successfully',article});
      }
      else{
        return res.json({'success':false,'message':'Article with the given id not found'});
      }
    })
}

export const deleteArticle = (req,res) => {
    Todo.findByIdAndRemove(req.params.id, (err,article) => {
      if(err){
      return res.json({'success':false,'message':'Some Error'});
      }
  return res.json({'success':true,'message':article.bodyText+' deleted successfully'});
    })
}