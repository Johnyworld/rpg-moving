function drawTilesInit() {
    var imageTile = new Image();
    imageTile.addEventListener('load', function() {
        var idx = 0;
        for ( var i=0; i<stage_home.backgrounds.length; i++ ) {
            for ( var j=0; j<stage_home.backgrounds[i].tile.length; j++ ) {
                TILES.push(
                    new DefineTile( imageTile, stage_home.backgrounds[i].name, stage_home.backgrounds[i].layer, 16, 16 )
                );
                var t = stage_home.backgrounds[i].tile[j];
                TILES[idx].define( stage_home.backgrounds[i].define[0], stage_home.backgrounds[i].define[1] );
                TILES[idx].drawTiles( t[0], t[1], t[2], t[3] );
                if ( stage_home.backgrounds[i].crop ) {
                    TILES[idx].cropSet( stage_home.backgrounds[i].crop[0], stage_home.backgrounds[i].crop[1] );
                }
                idx++;
            }
        }
    })
    imageTile.src = 'img/landsprite.png';
}

var Rosie;
var Utarag;
function setHeroes() {
    Rosie = HEROES[0];
    Utarag = HEROES[1];
}

function defineObjectsEach(i, image, array, ARRAY, stage) {
    for ( var j=0; j<stage.length; j++ ) {
        if ( array[i].id === stage[j].id ) {
            for( var k=0; k<stage[j].drop.length; k++ ) {
                if ( array[i].race === "Human" || array[i].race === "Orc" ) {
                    ARRAY.push( new DefineHuman( image, array[i] ) );
                } else {
                    ARRAY.push( new DefineObject( image, array[i] ) );
                }
                ARRAY[i+k].drop( stage[j].drop[k], stage[j].level );
            }
        }
    }
}

function defineObjects(array, ARRAY, stage) {
    var image = []; 
    for ( var i=0; i<array.length; i++ ) {
        image.push( new Image() );
        image[i].addEventListener('load', defineObjectsEach(i, image[i], array, ARRAY, stage));
    }
    ENTITIES = ENTITIES.concat(ARRAY);
    setHeroes();
}

function objectInit() {
    defineObjects(heroes, HEROES, stage1);
    defineObjects(enemies, ENEMIES, stage1);
    defineObjects(objects, OBJECTS, stage1);
}

