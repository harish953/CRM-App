/*
this file will hold the schema for user resources
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  /**
   * Setup mongodb connection and create
   */
  /**
   * name,userId,password, email, created,updatedAt
   * userType[admin, customer, engineer]
   * userStatus[Pending| Approved | Rejected ]
   */

  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
    unique: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  userType: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED",
  },
  ticketsCreated: {
    type: [mongoose.SchemaTypes.objectId],
    ref: "Ticket",
  },
  ticketsAssigned: {
    type: [mongoose.SchemaTypes.objectId],
    ref: "Ticket",
  },
});

module.exports = mongoose.model("User", userSchema);
