const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  email: {
    type: String,
    
  },
  username: {
    type: String,
    
  },
  meals: {
    type: Object
  },
  // expiryDate: { type: Date, default: Date.now(), expires: 3600 },
  createdAt: { type: Date, default: Date.now} ,
  isExpired: { type: Boolean, default: false },
  expiryTime: { type: Number }
});


// mealSchema.pre("save", function(next) {
 
// })



module.exports = mongoose.model("mealifymeals", mealSchema);
