const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// delete a user
app.delete('/api/delete', (req, res) => {
  res.send('Delete request sent');
  const userId = req.body.id;
  // read current JSON file and delete the user
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) console.log('Read Error', err);
    const jsonData = JSON.parse(data);
    // return users that don't have specific userId
    const filteredData = jsonData.filter(user => user.id !== userId);
    fs.writeFile('user.json', JSON.stringify(filteredData, null, '\t'), (error, result) => {
      if (error) console.log('Write Error', error);
    });
  });
});

app.post('/api/create', (req, res) => {
  const userFirst = req.body.firstName;
  const userLast = req.body.lastName;
  const userEmail = req.body.email;
  const userBirthday = req.body.birthday;
  const userZipcode = req.body.zipcode;
  const userObject = {
    id: '',
    firstName: userFirst,
    lastName: userLast,
    email: userEmail,
    birthday: userBirthday,
    zipcode: userZipcode,
  };
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) console.log('Read Error', err);
    const jsonData = JSON.parse(data);
    // Check if JSON file is empty
    if (jsonData.length === 0) {
      userObject.id = 1;
    } else {
      const lastId = jsonData[jsonData.length - 1].id
      userObject.id = lastId + 1;
    }
    jsonData.push(userObject); // append new jsonObject
    fs.writeFile('user.json', JSON.stringify(jsonData, null, '\t'), (error, result) => {
      if (error) console.log('Write Error', error);
    });
    res.send(jsonData);
  });
});

app.get('/api/getData', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) console.log('Read Error', err);
    const fileData = JSON.parse(data);
    res.send(fileData);
  });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
