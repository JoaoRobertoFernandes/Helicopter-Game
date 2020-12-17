/*----------Variables----------*/
var game = {};
/*----------Variables----------*/

/*----------Start----------*/
function start() {
    $("#start").hide();

    $("#background").append("<div id='player' class='ani1'></div>");
    $("#background").append("<div id='enemy1' class='ani2'></div>");
    $("#background").append("<div id='enemy2' ></div>");    
    $("#background").append("<div id='friend' class='ani3'></div>");

    
    /*----------Loop----------*/
    game.timer = setInterval(loop,30);
    function loop() {
        moveBg();
    }
    /*----------Loop----------*/

    /*----------Background Movement----------*/
    function moveBg() {
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    }    
    /*----------Background Movement----------*/    

}
/*----------Start----------*/
