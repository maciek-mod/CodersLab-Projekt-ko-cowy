
$(function(){

  //zmienne do gry
  var fireBold = $(".fireBold");
  var mario = $(".mario");
  var gameScreen = $(".screen");
  var evil = $(".evilCharakter");







  //funkcje
  // function hideBall(fireClone) {
  //   fireClone.fadeOut();
  // }

  gameScreen.on("click", function(event){

    //wspolrzedne klikniecia
    var xClick = event.pageX;
    var yClick = event.pageY;
    // console.log(xClick);

    //nastawianei fireballa

    //klonowanie, nadawanie displaya, animownaie proszuania sie
    // var fireClone = fireBold.clone().insertBefore(mario);
    // fireClone.css("display", "inline-block");
    // fireClone.animate({ left: xClick, top: yClick},15000);
    //
    // //ukrywanie po dodatrciu do celu
    // fireClone.fadeOut();


    fireBold.animate({ left: xClick, top: yClick},1000);


    var fireX = fireBold.offset().left;
    var fireY = fireBold.offset().top;

    var evilX = Math.ceil(evil.offset().left);
    var evilY = Math.ceil(evil.offset().top);
    var evilWidth = evil.width();
    var evilHeigth = evil.height();




    //kolizja chmurki z kula
    // var evilX = Math.ceil(evil.offset().left);
    // var evilY = Math.ceil(evil.offset().top);
    // var evilWidth = evil.width();
    // var evilHeigth = evil.height();
    //
    // console.log(evilX);
    //
    //
    // evil.animate({ left: "50px"},15000);
    //
    //
    // if (xClick >= evilX && xClick <= evilX + evilWidth && yClick >= evilY && yClick <= evilY + evilHeigth) {
    //   console.log("dziala");
    // }

    //warunek od kolizji z forem
    // for (var x = evilX; x <= evilX + evilWidth; x++) {
    //   for (var y = evilY; y < evilY + evilHeigth; y++) {
    //     if (xClick == x && yClick == y) {
    //       evil.fadeOut("slow");
    //     }
    //   }
    // }


  });


});
