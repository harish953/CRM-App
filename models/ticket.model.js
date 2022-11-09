/**
 * this section will contain schema of ticket entity
 * 
 */
 const mongoose = require('mongoose');
 const constants = require('../utils/constants');
 
 const ticketSchema = new mongoose.Schema({
     title:{
         type:String,
         required:true,
     },
     description:{
         type:String,
         required:true,
     },
     ticketPriority:{
         type:Number,
         required:true,
         Default:constants.ticketPriority.four // posssible values 1/2/3/4
     },
     status:{
         type:String,
         required:true,
         default:constants.ticketStatus.open // posssible value 'open' or 'closed' or blocked
 
     },
     reporter:{
         type:String,
         
     },
     assignee:{
         type:String,
     },
     createdAt:{
         type:Date,
         immediate:true,
         
         default:()=>{
             return Date.now();
         }
     },
     updatedAt:{
         type:Date,
         default:()=>{
             return Date.now();
         }
     }
 
 });
 module.exports = mongoose.model("ticket",ticketSchema);