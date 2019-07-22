function DefineTile( image, name, layer, width, height ) {
    this.image = image;
    this.name = name;
    this.layer = layer;
    this.width = width;
    this.height = height;
    
    this.pos = {
        "x": 0,
        "y": 0
    }
    
    this.box = {
        "top": 0,
        "bottom": 0,
        "left": 0,
        "right": 0
    }
    
    this.crop = {
        "left": 0,
        "right": 0,
    }
    
    this.cropSet = function( left, right ) {
        this.crop.left = left;
        this.crop.right = right;
    }

    this.boxSet = function() {
        this.box.top = this.startY * this.height;
        this.box.bottom = this.pos.y + this.height;
        this.box.left = this.startX * this.width + this.crop.left;
        this.box.right = this.pos.x + this.width - this.crop.right;
    }
    
    this.define = function( tileX, tileY ) {
        this.tileX = width * tileX;
        this.tileY = width * tileY;
    }
    
    this.drawTiles = function( startX, startY, timesX, timesY ) {
        this.startX = startX;
        this.startY = startY;
        this.timesX = timesX;
        this.timesY = timesY;
        for ( var x = startX; x < timesX + startX; x++ ) {
            for ( var y = startY; y < timesY + startY; y++ ) {
                this.draw( x, y );
            }
        }
    }

    this.draw = function( x, y ) {
        var buffer;
        if ( this.layer === 'over' ) {
            buffer = contextl2;
        } else {
            buffer = context;
        }
        this.pos.x = x * this.width;
        this.pos.y = y * this.height;
        buffer.drawImage(
            this.image,
            this.tileX, 
            this.tileY,
            this.width,
            this.height,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height 
        )
    }
    
    this.update = function() {
        this.boxSet();
        this.drawTiles( this.startX, this.startY, this.timesX, this.timesY );
    }
}