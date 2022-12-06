import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, }, //email should be unique
    tel:{type:String,required:true,},//phone number should be unique
    date:{type:Date, required:true},
    distination:{type:String,required:true},
    days:{type:Number,required:true}

  },
  {
    timestamps: true,
  }
);
//the above code is the user schema for booking form

const User = mongoose.model("User", userSchema);
//create monogoose model on the above schema
export default User;
