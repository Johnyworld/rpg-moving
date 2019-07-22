function Vec( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
}

function Crop( crop ) {
    this.top = crop[0];
    this.bottom = crop[1];
    this.left = crop[2];
    this.right = crop[3];
}

function Box() {
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
}

function Go() {
    this.up = 0;
    this.down = 0;
    this.left = 0;
    this.right = 0;
    this.ing = 0;
}

function Status( str, con, dex, int, wis, cha ) {
    this.str = str;
    this.con = con;
    this.dex = dex;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
    this.maxHealth = rollDice( 1, 6, Math.ceil(this.con/2) );
    this.maxMana = rollDice( 1, 6, Math.ceil(this.wis/2) );
    this.health = this.maxHealth;
    this.mana = this.maxMana;
}

function DefineHuman( image, Character ) {
    this.image = image;
    this.image.src = Character.src;
    this.name = Character.name;
    this.race = Character.race;
    this.crop = new Crop( Character.crop );
    this.go = new Go();
    this.box = new Box();
    this.speed = 1;
    
    this.width = Character.define[0];
    this.height = Character.define[1];
    this.tileX = Character.define[2];
    this.tileY = Character.define[3];
    
    this.active = {
        "follow" : 0
    }
    
    this.setBox = function() {
        this.box.top = this.pos.y + this.crop.top;
        this.box.bottom = this.pos.y + this.height - this.crop.bottom;
        this.box.left = this.pos.x + this.crop.left;
        this.box.right = this.pos.x + this.width - this.crop.right;
    }
    
    this.drop = function( Drop, level ) {
        var x = Drop[0] * TILESET.width;
        var y = Drop[1] * TILESET.height - this.height + this.crop.top;
        this.pos = new Vec( x, y );
        this.setBox();
        this.draw();
        this.level = 1;
        for ( var i=1; i<level; i++ ) {
            this.levelup();
        }
    }
    
    this.draw = function() {
        context.drawImage(
            this.image, 
            this.tileX, 
            this.tileY,
            this.width, 
            this.height,
            this.pos.x,
            this.pos.y,
            this.width, 
            this.height )
    }
    
    this.stat = new Status( rollDice(3, 6, 0), rollDice(3, 6, 0), rollDice(3, 6, 0), rollDice(3, 6, 0), rollDice(3, 6, 0), rollDice(3, 6, 0) );
    
    this.showStatus = function() {
        console.log( 'LEVEL: '+this.level );
        console.log( 'HP: '+this.stat.health+'/'+this.stat.maxHealth+' | '+'MANA: '+this.stat.mana+'/'+this.stat.maxMana );
        console.log( 'STR: '+this.stat.str+' | '+'CON: '+this.stat.con+' | '+'DEX: '+this.stat.dex+' | '+'INT: '+this.stat.int+' | '+'WIS: '+this.stat.wis+' | '+'CHA: '+this.stat.cha  );
    }
    
    this.levelup = function() {
        this.level += 1;
        this.stat.health += rollDice( 1, 4, Math.floor(this.stat.con/4));
        this.stat.maxHealth = this.stat.health;
        this.stat.mana += rollDice( 1, 4, Math.floor(this.stat.wis/4));
        this.stat.maxMana = this.stat.mana;
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
        ],
        "attackSouth" : [
            {
                "name" : "attackSouth-0",
                "rect" : [ 3, 0 ]
            },
            {
                "name" : "attackSouth-1",
                "rect" : [ 4, 0 ]
            }
        ]
    }

    this.AnimateWalk = function(moving) {
        if ( this.dir === 'up' ) {
            var frmX = this.Frames.goNorth[moving].rect[0];
            var frmY = this.Frames.goNorth[moving].rect[1];
            this.tileX = this.width * frmX;
            this.tileY = this.height * frmY;
        }
        if ( this.dir === 'down' ) {
            var frmX = this.Frames.goSouth[moving].rect[0];
            var frmY = this.Frames.goSouth[moving].rect[1];
            this.tileX = this.width * frmX;
            this.tileY = this.height * frmY;
        }
        if ( this.dir === 'left' ) {
            var frmX = this.Frames.goWest[moving].rect[0];
            var frmY = this.Frames.goWest[moving].rect[1];
            this.tileX = this.width * frmX;
            this.tileY = this.height * frmY;
        }
        if ( this.dir === 'right' ) {
            var frmX = this.Frames.goEast[moving].rect[0];
            var frmY = this.Frames.goEast[moving].rect[1];
            this.tileX = this.width * frmX;
            this.tileY = this.height * frmY;
        }
    }
    
    this.checkCollision = function() {
        this.setBox();
        for ( var i=0; i<TILES.length; i++ ) {
            if( TILES[i].layer === "wall" ) {
                if ( 
                    this.box.right > TILES[i].box.left && // 주인공의 오른쪽면 충돌
                    this.box.left < TILES[i].box.right && // 주인공의 왼쪽면 충돌
                    this.box.bottom > TILES[i].box.top && // 주인공의 아래쪽면 충돌
                    this.box.top < TILES[i].box.bottom // 주인공의 위쪽면 충돌
                ) {
                    return TILES[i];
                } else {
                    continue;
                }
            }
        }
        for ( var i=0; i<ENTITIES.length; i++ ) {
            if ( this === ENTITIES[i] ) { continue; }
            if ( 
                this.box.right > ENTITIES[i].box.left && // 주인공의 오른쪽면 충돌
                this.box.left < ENTITIES[i].box.right && // 주인공의 왼쪽면 충돌
                this.box.bottom > ENTITIES[i].box.top && // 주인공의 아래쪽면 충돌
                this.box.top < ENTITIES[i].box.bottom // 주인공의 위쪽면 충돌
            ) {
                return ENTITIES[i];
            } else {
                continue;
            }
        }
        return false;
    }
    
    this.follow = function() {
        if ( this.active.follow === 1 ) {
            this.box.left - 5 >= Rosie.box.right ? this.go.left = 1 : this.go.left = 0;
            this.box.right + 5 <= Rosie.box.left ? this.go.right = 1 : this.go.right = 0;
            this.box.top - 5 >= Rosie.box.bottom ? this.go.up = 1 : this.go.up = 0;
            this.box.bottom + 5 <= Rosie.box.top ? this.go.down = 1 : this.go.down = 0;
        }
    }
    
    this.update = function() {
        this.follow();
        this.draw();
        KeyState(this);
    }
}

function DefineObject( image, Object ) {
    this.image = image;
    this.image.src = Object.src;
    this.name = Object.name;
    this.crop = new Crop( Object.crop );
    this.go = new Go();
    this.box = new Box();

    this.width = Object.define[0];
    this.height = Object.define[1];
    this.tileX = Object.define[2];
    this.tileY = Object.define[3];

    this.setBox = function() {
        this.box.top = this.pos.y + this.crop.top;
        this.box.bottom = this.pos.y + this.height - this.crop.bottom;
        this.box.left = this.pos.x + this.crop.left;
        this.box.right = this.pos.x + this.width - this.crop.right;
    }

    this.drop = function( Drop, level ) {
        var x = Drop[0] * TILESET.width;
        var y = Drop[1] * TILESET.height - this.height + this.crop.top;
        this.pos = new Vec( x, y );
        this.setBox();
        this.draw();
    }

    this.draw = function() {
        context.drawImage(
            this.image, 
            this.tileX, 
            this.tileY,
            this.width, 
            this.height,
            this.pos.x,
            this.pos.y,
            this.width, 
            this.height )
    }
    
    
    this.update = function() {
        this.draw();
    }
}