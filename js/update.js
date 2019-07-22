function update() {
    
    requestAnimationFrame(update);
    
    for(var i=0; i<TILES.length; i++) {
        TILES[i].update();
    }
    for(var i=0; i<ENTITIES.length; i++) {
        ENTITIES.sort(function (a, b) { return a.box.bottom - b.box.bottom; });
    }
    for(var i=0; i<ENTITIES.length; i++) {
        ENTITIES[i].update();
    }
//    KeyState(Rosie);
}

objectInit();
drawTilesInit();
update();
