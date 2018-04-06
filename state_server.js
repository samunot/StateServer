var express = require("express");
var myParser = require("body-parser");
var fs = require("fs");

var states = fs.readFileSync("states.json");
states = JSON.parse(states).states;

var app = express();
app.use(myParser.urlencoded({ extended: true }));

// Reference: https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html#The%20C%20Code
function check(point, border) {
    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = border.length - 1; i < border.length; j = i++) {
        var xi = border[i][0],
            yi = border[i][1];
        var xj = border[j][0],
            yj = border[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) { inside = !inside };
    }
    return inside;
};


app.post("/", function(request, response) {
    query = request.body
    found = false
    states.forEach(element => {
        if (check([query.longitude, query.latitude], element.border)) {
            response.send(element.state);
            found = true
        }
    });
    // To check if point is outside US
    if (!found) {
        response.send("Outside US");
    }
});

app.listen(8080);