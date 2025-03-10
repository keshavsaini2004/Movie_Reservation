const mongoose  =  require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});


userSchema.pre('save',async function(next){
    const user = this;
    //hash  the password  only if it has been modified (or is new)
    if(!user.isModified('password')) return next();
  
    try{
        //hash password generation
        const salt  = await bcrypt.genSalt(10);
     //hash password 
     const hashedPassword= await bcrypt.hash(user.password,salt);
  
     //overide the plain password with the hashed one 
     user.password = hashedPassword;
     next();
    }catch(err){
    return next(err);
    }
    })
  userSchema.methods.comparePassword =async function(candidatePassword){
    try{
      //Use bcrypt   to comapare  the provided passsoword with the hashed password
      const isMatch = await bcrypt.compare(candidatePassword,this.password);
      return  isMatch;
    }catch(err){
      throw err;
    }
  }
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
  