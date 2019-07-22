var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');
var canvasl2 = document.getElementById('screenl2');
var contextl2 = canvasl2.getContext('2d');

var TILES = [];
var ENTITIES = [];
var OBJECTS = [];
var HEROES = [];
var ENEMIES = [];

var TILESET = {
    'width' : 16,
    'height' : 16
}

function rollDice( times, dice, num ) {
    var total = 0;
    for( var i=0; i<times; i++ ) {
        total = total + Math.ceil(Math.random()*dice);
    }
    total = total + num;
    return total;
}

function showPosition() {
    var xTimes = 30;
    var yTimes = 30;
    for ( var x=0; x<xTimes; x++ ) {
        for( var y=0; y<yTimes; y++ ) {
            contextl2.font = '8px Open sans';
            contextl2.fillStyle = "black";
            contextl2.fillText(x, TILESET.width*x, TILESET.height*y+6);
            contextl2.fillStyle = "red";
            contextl2.fillText(' '+y, TILESET.width*x, TILESET.height*y+12);
        }
    }
}
//showPosition();