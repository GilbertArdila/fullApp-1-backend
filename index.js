const express =require('express');
const cors = require('cors')
const {errorHandler,boomErrorHandler,ormErrorHandler} = require('./src/middlewares/error.handler');

const routerApi = require('./src/routes');
const app = express();
const port =process.env.PORT || 3000;

//para enviar información en formato json
app.use(express.json());
//cors
const whiteList = ['http://localhost:8080','http://localhost:5173','https://adminmodule.netlify.app'];
const options = {
  origin: (origin,callback) => {
     if(whiteList.includes(origin) || !origin){
      callback(null,true)
     }else{
        callback(new Error('Cors error, user not allowed'))
     }
  }
}
app.use(cors(options));
routerApi(app);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
