const express =require('express');
const cors = require('cors')
const routerApi = require('./src/routes');
const app = express();
const port =process.env.PORT || 3000;

//para enviar información en formato json
app.use(express.json());
//cors
const whiteList = ['http://localhost:8080','https://myFrontendApp.com'];
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

app.listen(port, () => {
  console.log('port '+port);
});
