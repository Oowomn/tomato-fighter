const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body);
    const { dims, state } = req.body.arena;
    var findPeople = (state, pURL) => {
        return state[pURL];
    };

    var mySelf = findPeople(state, "https://tomato-fighter-aikn37gbia-uc.a.run.app");

    if (mySelf.x != dims[0]) {
        if (mySelf.direction != 'S') {
            res.send('L');
        } else {
            res.send('F');
        }
    } else if (mySelf.y != dims[1]) {
        if (mySelf.direction != 'E') {
            res.send('L');
        } else {
            res.send('F');
        }
    } else {
        res.send('T');
    }
});

app.listen(process.env.PORT || 8080);
