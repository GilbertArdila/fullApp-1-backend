const express =require('express');
const cors = require('cors')
const {errorHandler,boomErrorHandler,ormErrorHandler} = require('./src/middlewares/error.handler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const routerApi = require('./src/routes');
const app = express();
const port =process.env.PORT || 3000;

const swaggerSpec= {
  definition:{
    openapi:'3.0.0',
    info:{
      title:'API de productos',
      version:'1.0.0',
      description:'Geek Store API',
      contact:{
        name:'Gilbert Ardila',
        email:'gilbertferney@gmail.com'
      },
      servers:[
        {
          url:'http://localhost:3000'
        },
        {
          url:'https://fullapp-1-backend-production.up.railway.app'
        }
      ]
    }
  },
  apis:['./src/routes/*.js']

}




//para enviar información en formato json
app.use(express.json());
// swagger
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerJsDoc(swaggerSpec)));


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
