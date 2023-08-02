const boom = require('@hapi/boom');

const validatorHandler = (schema,property)=> {
 return (req,res,next)=>{
     const data = req[property];         //to send all errors not one by one
     const {error} = schema.validate(data,{abortEarly:false});
     if(error){
      next(boom.badRequest(error))
     }
     next();
 };
};

module.exports = validatorHandler
