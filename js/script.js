/*----------Variables----------*/
var game = {};
var k = {
    w: 87,
    s: 83,
    d: 68
}
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

        }
    }
    /*----------Player Movement----------*/  
}
/*----------Start----------*/
