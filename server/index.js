const express = require('express');
const app = express();
const port = 5000;
let PythonShell = require('python-shell');

//searchRelated/ad_management_sample.py


app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.post('/api/clickcnt', (req, res) => {
    let keywordTrim = `${req.body.clickName}`.trim()
    let options = {
        mode: 'text',
        args: [`${keywordTrim}`, '0']
    };
    let clickedres;

    PythonShell.PythonShell.run('searchRelated/ad_management_sample.py', options, function(err, results) {
        if(err) throw err
        clickedres = results;
        
        res.send(clickedres);
    }) 
})

app.post('/api/search', (req, res) => {
    let age = String(req.body.age);

    let request = require('request');
  let client_id = '7Fu4qe3isictj2YJ0gCU';
  let client_secret = 'ztee3uWChW';
  let api_url = 'https://openapi.naver.com/v1/datalab/search';
  let request_body = {  
      "startDate": `${req.body.aniversal}-01-01`,
      "endDate": `${req.body.aniversal}-12-30`,
      "timeUnit": "month",
      "keywordGroups": [
          {
              "groupName": `${req.body.searchContent}`,
              "keywords": [
                `${req.body.searchContent}`,
              ]
          }
      ],
      "device": "pc",
      "ages": [`${req.body.age}`],
      "gender": `${req.body.gender}`
  };

  

  request.post({
          url: api_url,
          body: JSON.stringify(request_body),
          headers: {
              'X-Naver-Client-Id': client_id,
              'X-Naver-Client-Secret': client_secret,
              'Content-Type': 'application/json'
          }
      },
      function (error, response, body) {
        
        res.send(body);
      });
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))