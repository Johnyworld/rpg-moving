var jsKeyUp = document.getElementById('jsKeyUp');
var jsKeyDown = document.getElementById('jsKeyDown');
var jsKeyLeft = document.getElementById('jsKeyLeft');
var jsKeyRight = document.getElementById('jsKeyRight');

function collisionCheck( dir, entity ) {
    
    var CollisionTile = entity.checkCollision();
    if ( CollisionTile !== false ) {
        if ( entity.go.up + entity.go.down + entity.go.left + entity.go.right === 1 ) {
            entity.go.ing = 0;
        }
        if ( dir === 'left' ) { entity.pos.x = CollisionTile.box.right - entity.crop.left }
        if ( dir === 'right' ) { entity.pos.x = CollisionTile.box.left - entity.width + entity.crop.right }
        if ( dir === 'up' ) { entity.pos.y = CollisionTile.box.bottom - entity.crop.top }
        if ( dir === 'down' ) { entity.pos.y = CollisionTile.box.top - entity.height + entity.crop.bottom }
    } 
}

function KeyState(entity) {
    var GoingLeft = entity.go.left === 1 && entity.go.right === 0;
    var GoingRight = entity.go.right === 1 && entity.go.left === 0;
    var GoingUp = entity.go.up === 1 && entity.go.down === 0;
    var GoingDown = entity.go.down === 1 && entity.go.up === 0;
    
    if ( GoingLeft || GoingRight || GoingUp || GoingDown ) {
        
        var moving;
        moving = Math.floor(entity.go.ing/15);
        entity.go.ing += entity.speed*1.5;
        
        if ( GoingLeft ) {
            entity.pos.x -= entity.speed;
            entity.dir = 'left';
            collisionCheck( entity.dir, entity, moving );
        }
        if ( GoingRight ) {
            entity.pos.x += entity.speed;
            entity.dir = 'right';
            collisionCheck( entity.dir, entity, moving );
        }
        if ( GoingUp ) {
            entity.pos.y -= entity.speed;
            entity.dir = 'up';
            collisionCheck( entity.dir, entity, moving );
        }
        if ( GoingDown ) {
            entity.pos.y += entity.speed;
            entity.dir = 'down';
            collisionCheck( entity.dir, entity, moving );
        }
        
        if ( moving >= 4 ) {
            entity.go.ing = 0;
            moving = 3;
        }
        entity.AnimateWalk(moving);
    }
}


// 키 이벤트 등록
var keyControl = [ 'keydown', 'keyup' ];
for ( var i=0; i<keyControl.length; i++ ) {
    window.addEventListener(keyControl[i], function(event) {
        var key = event.keyCode;
        var isKeyDown = event.type;
        if ( key === 38 ) {
            event.preventDefault();
            isKeyDown === 'keydown'? Rosie.go.up = 1 : Rosie.go.up = 0;
        }
        if ( key === 40 ) {
            event.preventDefault();
            isKeyDown === 'keydown'? Rosie.go.down = 1 : Rosie.go.down = 0;
        }
        if ( key === 37 ) {
            event.preventDefault();
            isKeyDown === 'keydown'? Rosie.go.left = 1 : Rosie.go.left = 0;
        }
        if ( key === 39 ) {
            event.preventDefault();
            isKeyDown === 'keydown'? Rosie.go.right = 1 : Rosie.go.right = 0;
        }
        if ( isKeyDown !== 'keydown' ) {
            Rosie.go.ing = 0;
            Rosie.AnimateWalk(0); // 키를 멈췄을때 캐릭터 멈춰있는 애니메이션
        }
    });
}

// 롱탭시, 컨텍스트 메뉴 안나오게 하기
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

// for javascript
jsKeyUp.addEventListener( 'touchstart', function() { Rosie.go.up = 1; } );
jsKeyDown.addEventListener( 'touchstart', function() { Rosie.go.down = 1; });
jsKeyLeft.addEventListener( 'touchstart', function() { Rosie.go.left = 1; });
jsKeyRight.addEventListener( 'touchstart', function() { Rosie.go.right = 1; });

jsKeyUp.addEventListener( 'touchend', function() { Rosie.go.up = 0; Rosie.go.ing = 0; Rosie.AnimateWalk(0); } );
jsKeyDown.addEventListener( 'touchend', function() { Rosie.go.down = 0; Rosie.go.ing = 0; Rosie.AnimateWalk(0); });
jsKeyLeft.addEventListener( 'touchend', function() { Rosie.go.left = 0; Rosie.go.ing = 0; Rosie.AnimateWalk(0); });
jsKeyRight.addEventListener( 'touchend', function() { Rosie.go.right = 0; Rosie.go.ing = 0; Rosie.AnimateWalk(0); });