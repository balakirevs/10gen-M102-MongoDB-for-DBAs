mongo --shell week3.js
The method map_closest() will already be defined. You can type it at the shell prompt without parameters to see its source code:

> map_closest
function map_closest() {
    var pitt = [-80.064879, 40.612044];
    var phil = [-74.978052, 40.089738];

    function distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (distance(this.loc, pitt) < distance(this.loc, phil)) {
        emit("pitt", 1);
    } else {
        emit("phil", 1);
    }
}
> 
Question: How many zip codes in PA are closer to philadelphia than to pittsburgh (given our map function's implementation)? Use map/reduce to find the answer.

answer: 732