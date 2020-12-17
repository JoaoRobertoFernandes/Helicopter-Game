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
var endGame = false;
var points = 0;
var saves = 0;
var lost = 0;
var currentEnergy = 3;
/*----------Variables----------*/

/*----------Start----------*/
function start() {
    $("#start").hide();

    $("#background").append("<div id='player' class='ani1'></div>");
    $("#background").append("<div id='enemy1' class='ani2'></div>");
    $("#background").append("<div id='enemy2' ></div>");    
    $("#background").append("<div id='friend' class='ani3'></div>");
    $("#background").append("<div id='score'></div>");
    $("#background").append("<div id='energy'></div>");

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
        collision();
        score();
        energy();
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

    /*----------Collision----------*/
    function collision() {
        var coll1 = ($("#player").collision($("#enemy1")));
        var coll2 = ($("#player").collision($("#enemy2")));
        var coll3 = ($("#shoot").collision($("#enemy1")));
        var coll4 = ($("#shoot").collision($("#enemy2")));
        var coll5 = ($("#player").collision($("#friend")));
        var coll6 = ($("#enemy2").collision($("#friend")));

        if (coll1.length > 0) {
            currentEnergy--;
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);

            posY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", posY);

        }

        if (coll2.length > 0) {
            currentEnergy--;
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X,enemy2Y);
                    
            $("#enemy2").remove();
            enemyRespawn2();
                
            }
            
        if (coll3.length > 0) {
            vel = vel + 0.3;
            points = points + 100;
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);
            $("#shoot").css("left",950);
            posY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",posY);
        }
        
        if (coll4.length > 0) {
            points = points + 50;
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();
            explosion2(enemy2X, enemy2Y);
            $("#shoot").css("left",950);
            enemyRespawn2();  
            }

        if (coll5.length >0) {
            saves++;
	        friendRespawn();
            $("#friend").remove();
        }

        if (coll6.length > 0) {
            lost++;
            friendX = parseInt($("#friend").css("left"));
            friendY = parseInt($("#friend").css("top"));
            explosion3(friendX,friendY);
            $("#friend").remove();        
            friendRespawn();     
        }
    }  
    /*----------Collision----------*/  
    
    /*----------Explosion----------*/
    function explosion1(enemy1X, enemy1Y) {
        $("#background").append("<div id='explosion1'></div>");
        $("#explosion1").css("background-image", "url(img/explosao.png)");
        var div = $("#explosion1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({width:200, opacity:0}, "slow");   
        
        var explosionTime = window.setInterval(removeExplosion, 1000);

            function removeExplosion() {
                div.remove();
                window.clearInterval(explosionTime);
                explosionTime = null;
            }

    } 
    
    function explosion2(enemy2X, enemy2Y) {
        $("#background").append("<div id='explosion2'></div>");
        $("#explosion2").css("background-image", "url(img/explosao.png)");
        var div2 = $("#explosion2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({width:200, opacity:0}, "slow");   
        
        var explosionTime2 = window.setInterval(removeExplosion2, 1000);

            function removeExplosion2() {
                div2.remove();
                window.clearInterval(explosionTime2);
                explosionTime2 = null;
            }
    }
    
    function explosion3(friendX,friendY) {
        $("#background").append("<div id='explosion3' class='ani4'></div");
        $("#explosion3").css("top", friendY);
        $("#explosion3").css("left", friendX);
        var explosionTime3 = window.setInterval(resetExplosion3, 1000);
        function resetExplosion3() {
            $("#explosion3").remove();
            window.clearInterval(explosionTime3);
            explosionTime3 = null;       
        }
        
    }
    /*----------Explosion----------*/  
    
    /*----------Respawn Enemy----------*/
    function enemyRespawn2() {
        var collisionTime4 = window.setInterval(respawn4, 5000);
            
            function respawn4() {
            window.clearInterval(collisionTime4);
            collisionTime4 = null;
                
                if (endGame == false) {
                    $("#background").append("<div id=enemy2></div");
                }
            }	
        }	  
    /*----------Respawn Enemy----------*/  
    
    /*----------Respawn Friend----------*/
    function friendRespawn() {
        var friendTime = window.setInterval(respawn6, 6000);
        
            function respawn6() {
            window.clearInterval(friendTime);
            friendTime = null;
            
            if (endGame == false) {
                $("#background").append("<div id='friend' class='ani3'></div>");
            }  
        }
    }  
    /*----------Respawn Friend----------*/  
    
    /*----------Score----------*/  
    function  score() {
        $("#score").html("<h2> Points: " + points + " Saves: " + saves + " Lost: " + lost + "</h2>"); 
    }
    /*----------Score----------*/

    /*----------Energy----------*/  
    function energy() {
        if (currentEnergy == 3) {
		    $("#energy").css("background-image", "url(img/energia3.png)");
	    }

	    if (currentEnergy == 2) {
		    $("#energy").css("background-image", "url(img/energia2.png)");
	    }

	    if (currentEnergy == 1) {
		    $("#energy").css("background-image", "url(img/energia1.png)");
	    }

	    if (currentEnergy == 0) {	
    		$("#energy").css("background-image", "url(imgs/energia0.png)");
	    }
    }
    /*----------Energy----------*/  
}
/*----------Start----------*/
