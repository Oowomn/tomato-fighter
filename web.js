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
    const { _links } = req.body;

    var findPeople = (state, pURL) => {
        return state[pURL];
    };

    var myLink = _links.self.href;
    var mySelf = findPeople(state, myLink);

    var findClosest = (game, myState) => {
        var names = Object.keys(game);
        var index = names.indexOf(myLink);
        names.splice(index, 1);

        var players = names.map( n => game[x]);

        var closePlayers = players.filter((p1) => {
            return ((myState.y - p1.y) <= 2) && ((myState.x - p1.x) <= 2) 
        });
        
        if (closePlayers.length != 0) {
            closePlayers.sort((p1, p2)=> {
                if (p1.y == p2.y) {
                    return p1.x >= p2.x;
                } else {
                    return p1.y >= p2.y;
                }
            })

            return closePlayers[0];
        } else {
            return null;
        }
    }

    var closestOne = findClosest(state, mySelf);

    if (mySelf.x != (dims[0] - 1)) {
        if (mySelf.direction != 'S') {
            res.send('L');
        } else {
            res.send('F');
        }
    } else if (mySelf.y != (dims[1] - 1)) {
        if (mySelf.direction != 'E') {
            res.send('L');
        } else {
            res.send('F');
        }
    } else {
        if (closestOne != null) {
            if (closestOne.x == mySelf.x) {
                if (mySelf.direction != 'W') {
                    res.send('L');
                } else {
                    res.send('T');
                }
            } else if (closestOne.y == mySelf.y) {
                if (mySelf.direction != 'N') {
                    res.send('L');
                } else {
                    res.send('T');
                }
            } else {
                res.send('T');
            }
        } else {
            res.send('F');
        }
    }
});

app.listen(process.env.PORT || 8080);
