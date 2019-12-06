var express = require("express");
var bodyParser = require("body-parser");
var flatten = require('lodash.flatten');
var app = express();
var cors = require('cors');
var axios = require("axios");
var baseURL = "https://api.data.gov/ed/collegescorecard/v1/schools?school.state=NY&latest.academics.program.bachelors.education=1&_fields=id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size&page=0&api_key=XMWGLsXeRZ1kIFMWAEyuyBjkalMQ1s6KfvUDsLb5"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// routes(app);

let schools = [];
let pageCount;  


app.listen(3000, () => {
    console.log("Server running on port 3000");
    
    axios.get(baseURL)
    .then(function (response) {
        // console.log(response)
        // console.log('pages' response.data.metadata.total)
        pageCount = Math.round(response.data.metadata.total / response.data.metadata.per_page)
        schools.push(response.data.results)
    
        for (let i=0; i < pageCount; i++) {
            let url = baseURL.split(`page=0`).join(`page=${i + 1}`)
            axios.get(url)
                .then(function (response) {
                    schools.push(response.data.results)
                })
                .catch((err)=>console.log(err))
        }

            
    })
        

  })
 

   
app.get("/schools", (req, res, next) => {
    res.json(flatten(schools));
   });
   
  
