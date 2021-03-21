const express = require('express');
const app = express();
const port = 5000;
let PythonShell = require('python-shell');
let options = {
    mode: 'text',
    pythonPath: '',
    pythonOption: ['-u'],
    scriptPath: '',
    args: ['value1', 'value2', 'value3']
};

PythonShell.PythonShell.run('test.py', options, function(err, results) {
    if(err) throw err;

    console.log('results: %j', results);
})


app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => res.send("Hello World"));

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요')
});

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