/*----------Variables----------*/
var game = {};
var k = {
    w: 87,
    s: 83,
    d: 68
}
var vel = 5;
var posY = parseInt(Math.random() * 334);
var canShoot = true;
/*----------Variables----------*/

/*----------Start----------*/
function start() {
    $("#start").hide();

    $("#background").append("<div id='player' class='ani1'></div>");
    $("#background").append("<div id='enemy1' class='ani2'></div>");
    $("#background").append("<div id='enemy2' ></div>");    
    $("#background").append("<div id='friend' class='ani3'></div>");

    /*----------Keypress----------*/
    game.press = [];
    $(document).keydown(function(e) {
        game.press[e.which] = true;
    });

    $(document).keyup(function(e) {
        game.press[e.which] = false;
    });
    /*----------Keypress----------*/
    
    /*----------Loop----------*/
    game.timer = setInterval(loop,30);
    function loop() {
        moveBg();
        movePlayer();
        moveEnemy1();
        moveEnemy2();
        moveFriend();
    }
    /*----------Loop----------*/

    /*----------Background Movement----------*/
    function moveBg() {
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    }    
    /*----------Background Movement----------*/    

    /*----------Player Movement----------*/  
    function movePlayer() {
        if (game.press[k.w]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top",  top - 10);

            /*-----Limit Position-----*/
            if (top <= 0) {
                $("#player").css("top",  top + 10);
            } 
            /*-----Limit Position-----*/ 
        }

        if (game.press[k.s]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top",  top + 10);

             /*-----Limit Position-----*/
             if (top >= 437) {
                $("#player").css("top",  top - 10);
            } 
            /*-----Limit Position-----*/ 
        }

        if (game.press[k.d]) {
            shooting();
        }
    }
    /*----------Player Movement----------*/

    /*----------Enemy Movement----------*/
    function moveEnemy1() {
        posX = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left", posX - vel);
        $("#enemy1").css("top", posY);

            if (posX <= 0) {
                posY = parseInt(Math.random() * 334);
                $("#enemy1").css("left", 634);
                $("#enemy1").css("top", posY);
            }
    }

    function moveEnemy2() {
        posX = parseInt($("#enemy2").css("left"));
        $("#enemy2").css("left", posX - 3);

        if (posX <= 0) {
            $("#enemy2").css("left", 775);
        }
    }

    /*----------Enemy Movement----------*/  

    /*----------Friend Movement----------*/
    function moveFriend() {
        posX = parseInt($("#friend").css("left"));
        $("#friend").css("left", posX + 1);

        if (posX > 906) {
            $("#friend").css("left", 0);
        }
    }
    /*----------Friend Movement----------*/

    /*----------Shoot----------*/
    function shooting() {
        if (canShoot == true) {
            canShoot = false;
            topH = parseInt($("#player").css("top"));
            posX = parseInt($("#player").css("left"));
            shootX = posX + 190;
            shootTop = topH + 37;
            $("#background").append("<div id='shoot' ></div>");
            $("#shoot").css("top", shootTop);
            $("#shoot").css("left", shootX);
            
            var shootTimer = window.setInterval(execShoot, 30);
        }

            function execShoot() {
                posX = parseInt($("#shoot").css("left"));
                $("#shoot").css("left", posX + 15);

                if (posX > 900) {
                    window.clearInterval(shootTimer);
                    shootTimer = null;
                    $("#shoot").remove();
                    canShoot = true;
                }
            }
    }
    /*----------Shoot----------*/  
}
/*----------Start----------*/
