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

    var names = Object.keys(state);
    var index = names.indexOf(myLink);
    names.splice(index, 1);

    var players = names.map( n => game[n]);

    var findClosest = (players, myState) => {
        var closePlayers = players.filter((p1) => {
            return (Math.abs(myState.y - p1.y) <= 2) && (Math.abs(myState.x - p1.x) <= 2) 
        });
        
        if (closePlayers.length != 0) {
            return closePlayers[0];
        } else {
            return null;
        }
    }

    var closestOne = findClosest(players, mySelf);

    var onLeft = (p, distance = 1) => { return (p.y == mySelf.y) && (p.x == (mySelf.x - 1)); };
    var onRight = (p, distance = 1) => { return (p.y == mySelf.y) && (p.x == (mySelf.x + 1)); };
    var onTop = (p, distance = 1) => { return (p.y == (mySelf.y - 1)) && (p.x == mySelf.x); };
    var onBottom = (p, distance = 1) => { return (p.y == (mySelf.y + 1)) && (p.x == mySelf.x); };

    var isInfrontOfMe = (ps) => {
        var result = ps.filter( (p) => {
            return onLeft(p) || onRight(p) || onTop(p) || onBottom(p)
        })
        return result.count > 0
    }

    if(mySelf.wasHit) {
        if (isInfrontOfMe(players)) {
            res.send('L');
        } else {
            res.send('F');
        }
    } else if (closestOne != null) {
        if (onLeft(closestOne, 2)) {
            if (mySelf.direction != 'W') {
                res.send('L');
            } else {
                res.send('T');
            }
        } else if (onRight(closestOne, 2)) {
            if (mySelf.direction != 'E') {
                res.send('L');
            } else {
                res.send('T');
            }
        } else if (onTop(closestOne, 2)) {
            if (mySelf.direction != 'N') {
                res.send('L');
            } else {
                res.send('T');
            }
        } else if (onBottom(closestOne, 2)) {
            if (mySelf.direction != 'S') {
                res.send('L');
            } else {
                res.send('T');
            }
        } else {
            res.send('F');
        }

    } else {
       let moves = ['L','R','F'];
       res.send(moves[Math.floor(Math.random() * moves.length)]);
    }
});

app.listen(process.env.PORT || 8080);
