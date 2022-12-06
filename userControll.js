import asyncHandler from "express-async-handler";
import User from "./userModel.js";

export const registerUser = asyncHandler(async (req, res) => { //this function is asyncoronous 
    const { name, email,tel,days,distination,date } = await req.body; //await will handle promises 
    console.log(name)
    if (!name || !email|| !tel || !days ||! distination  || !date) {//all the feild should not empty
      res.status(400);
      throw new Error("Please enter all the fields");
    }

  const user = await User.create({
    name,
    email,
    tel,
    distination,
    date,
    days
  });
  if (user) {
    //if the email and tel is unique then the data will store in database.
      res.status(201).json({
        name: user.name,
        email: user.email,
        tel: user.tel,
        distination: user.distination,
        date: user.date,
        days:user.days
      });
  
  } else {
    res.status(400);
    throw new Error("Failed to Create The User");
  }
});
