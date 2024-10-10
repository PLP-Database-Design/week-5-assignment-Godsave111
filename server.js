// import some dependecies or packages
 // express framework- it is used for handling http request 

 const express =require('express');

// create an intance of the framework 
const app = express();
// dbms mysql
 const mysql =require('mysql2');
// cross origin resource sharing 
const cors = require('cors');
// environment variable 
const dotenv = require('dotenv');


app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the databse 
const db= mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
     // password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

// check for the connection 
db.connect((error) => {
// if there is no connection= no wedding 
 if(error) return console.log('error connecting to MYSQL');
  // if yes there is connection = wedding go on 
  console.log("connected to mysql as id: " , db.threadId);
})

// GET METHOD CODE GOES HERE
// BRINGING THE VIEWS TO SERVER.JS GOES BELOW 

app.set('view engine' , 'ejs')
app.set('views', __dirname+'/views');

// USING THE GET METHOD NOW 
app.get('/data' , (req,res ) => {
    // retrive the data from databse 
    db.query('SELECT * FROM patients' , (err,results )=> {
        if(err){
            console.error(err)
            res.status(500).send('error retrieving data ')
        }else{
            // if no error display the patients records to the browser 
            res.render('data', {results:results});

        }

    })
});

// STOP GET METHOD CODE HERE 



// THE SERVER 
app.listen(process.env.PORT, () => {
    console.log(`server listening on port${process.env.PORT}`);
    
    // send  a message to the browser 
     console.log('sending message to the browser....')
     app.get('/', (req , res ) => {
        res.send('YEY!!!! wedding can proceed , the server started succcessfully !!!!');
     });



     });
