function DefineOrcs() {
    this.Define = function( image, width, height, tileX, tileY, drawX, drawY ) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tileX = width * tileX;
        this.tileY = width * tileY;

        this.drawX = drawX;
        this.drawY = drawY;
        if ( !drawX ) { this.drawX = this.width; }
        if ( !drawY ) { this.drawY = this.height; }

        this.offsetX = this.width - this.drawX;
        this.offsetY = this.width - this.drawY;
    }
    
    this.pos = {
        "x": 0 , 
        "y": 0 
    }
    
    this.go = {
        "up" : 0,
        "down" : 0,
        "left" : 0,
        "right" : 0,
        "ing" : 0
    }

    this.Frames = {
        "goNorth" : [
            {
                "name" : "goNorth-0",
                "rect" : [ 0, 1 ]
            },
            {
                "name" : "goNorth-1",
                "rect" : [ 1, 1 ]
            },
            {
                "name" : "goNorth-2",
                "rect" : [ 0, 1 ]
            },
            {
                "name" : "goNorth-3",
                "rect" : [ 2, 1 ]
            }
        ],
        "goSouth" : [
            {
                "name" : "goSouth-0",
                "rect" : [ 0, 0 ]
            },
            {
                "name" : "goSouth-1",
                "rect" : [ 1, 0 ]
            },
            {
                "name" : "goSouth-2",
                "rect" : [ 0, 0 ]
            },
            {
                "name" : "goSouth-3",
                "rect" : [ 2, 0 ]
            }
        ],
        "goWest" : [
            {
                "name" : "goWest-0",
                "rect" : [ 0, 2 ]
            },
            {
                "name" : "goWest-1",
                "rect" : [ 1, 2 ]
            },
            {
                "name" : "goWest-2",
                "rect" : [ 0, 2 ]
            },
            {
                "name" : "goWest-3",
                "rect" : [ 2, 2 ]
            }
        ],
        "goEast" : [
            {
                "name" : "goEast-0",
                "rect" : [ 0, 3 ]
            },
            {
                "name" : "goEast-1",
                "rect" : [ 1, 3 ]
            },
            {
                "name" : "goEast-2",
                "rect" : [ 0, 3 ]
            },
            {
                "name" : "goEast-3",
                "rect" : [ 2, 3 ]
            }
        ]
    }

    this.AnimateWalk = function(moving) {
        if ( this.dir === 'up' ) {
            var frmX = this.Frames.goNorth[moving].rect[0];
            var frmY = this.Frames.goNorth[moving].rect[1];
            this.tileX = this.drawX * frmX;
            this.tileY = this.drawY * frmY;
        }
        if ( this.dir === 'down' ) {
            var frmX = this.Frames.goSouth[moving].rect[0];
            var frmY = this.Frames.goSouth[moving].rect[1];
            this.tileX = this.drawX * frmX;
            this.tileY = this.drawY * frmY;
        }
        if ( this.dir === 'left' ) {
            var frmX = this.Frames.goWest[moving].rect[0];
            var frmY = this.Frames.goWest[moving].rect[1];
            this.tileX = this.drawX * frmX;
            this.tileY = this.drawY * frmY;
        }
        if ( this.dir === 'right' ) {
            var frmX = this.Frames.goEast[moving].rect[0];
            var frmY = this.Frames.goEast[moving].rect[1];
            this.tileX = this.drawX * frmX;
            this.tileY = this.drawY * frmY;
        }
    }
    
    this.Status = function( str, con, dex, int, wis, cha ) {
        this.str = str;
        this.con = con;
        this.dex = dex;
        this.int = int;
        this.wis = wis;
        this.cha = cha;

        this.health = rollDice( 1, 6, Math.ceil(con/2) );
        this.maxHealth = this.health;
        this.mana = rollDice( 1, 6, Math.ceil(wis/2) );
        this.maxMana = this.mana;
    }

    this.ShowStatus = function() {
        console.log( 'HP: '+this.health+'/'+this.maxHealth+' | '+'MANA: '+this.mana+'/'+this.maxMana );
        console.log( 'STR: '+this.str+' | '+'CON: '+this.con+' | '+'DEX: '+this.dex+' | '+'INT: '+this.int+' | '+'WIS: '+this.wis+' | '+'CHA: '+this.cha  );
    }

    this.drawCharacter= function( x, y ) {
        this.pos.x = x*TILESET.width;
        this.pos.y = y*TILESET.height;
        this.draw();
    }

    this.draw = function() {
        context.drawImage(
            this.image, 
            this.tileX, 
            this.tileY,
            this.drawX, 
            this.drawY,
            this.pos.x + this.offsetX, 
            this.pos.y + this.offsetY,
            this.drawX, 
            this.drawY )
    }
    
    var collisionGroup = [ TILES, OBJECTS ];
    this.checkCollision = function() {
        for ( var k=0; k<collisionGroup; k++ ) {
            for ( var i=0; i<collisionGroup[k].length; i++ ) {
                if( collisionGroup[k][i].layer === "wall" ) {
                    if ( 
                        this.pos.x+this.width > collisionGroup[k][i].startX * collisionGroup[k][i].width && // 주인공의 오른쪽면 충돌
                        this.pos.x < ( collisionGroup[k][i].startX + collisionGroup[k][i].timesX ) * collisionGroup[k][i].width && // 주인공의 왼쪽면 충돌
                        this.pos.y+this.height > ( collisionGroup[k][i].startY - 1 ) * collisionGroup[k][i].height + this.height && // 주인공의 아래쪽면 충돌
                        this.pos.y < ( collisionGroup[k][i].startY + collisionGroup[k][i].timesY - 1 ) * collisionGroup[k][i].height + this.height // 주인공의 위쪽면 충돌
                    ) {
                        return collisionGroup[k][i];
                    } else {
                        continue;
                    }
                }
            }
        }
        return false;
    }
    
    this.update = function() {
        this.draw();
    }
}