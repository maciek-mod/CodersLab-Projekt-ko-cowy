
$(function(){


  //posta mario i tło
  var mario = $(".mario");
  var gameScreen = $(".screen");
  var pipe = $(".pipe");
  var pipeTxt = $(".pipeTxt");
  var luigi = $(".luigi");
  var cloudEgg = $(".cloud-1");
  var thunder = $(".thunder");
  var mountain = $(".mountain");

  //kula ognia i wymiary jej
  var fireBold = $(".fireBold");
  var fireBoldSize ={
    height: fireBold.height(),
    width : fireBold.width()
  };
  // console.log(fireBoldSize);

  //chmurka i wymiary jej
  var evilCloud = $(".evilCharakter");
  var evilCloudSize ={
    height: evilCloud.height(),
    width : evilCloud.width()
  };

  var screenStart = $(".screenStart");
  var btnStart = $(".btnStart");
  var startText = $(".StartText");


  //licznik
  var countMario = $(".score_count");
  var count = 0;

  btnStart.on("click", function(e){
    screenStart.fadeOut(500);
    setTimeout(function(){startText.show()}, 600);
    setTimeout(function(){startText.hide()}, 950);
    setTimeout(function(){startGame()}, 1000);

  });

  function startGame(){
    //funkcja kolizji obiektow, oraz akcja po nim
    function collision(position1, size1, position2, size2, ball) {
      if (((position1.left + size1.width)  > position2.left) &&
      ((position1.top  + size1.height) > position2.top)  &&
      ((position2.left + size2.width)  > position1.left) &&
      ((position2.top  + size2.height) > position1.top)) {

        $(".fireBold").remove();
        evilCloud.css("backgroundImage", "url(img/evilEnd.png)");
        evilCloud.fadeOut();
        counter();

      }
    }

    // funkcja zliczania punktow
    function counter(){
      count ++;
      if (count <= 9 ) {
        countMario.text("00000" + count);
      }else if (count <= 99 ) {
        countMario.text("0000" + count);
      }else if (count <= 999 ) {
        countMario.text("000" + count);
      }else if (count <= 9999 ) {
        countMario.text("00" + count);
      }else if (count <= 99999 ) {
        countMario.text("0" + count);
      }else {
        countMario.text( count);
      }
      newEvilCloud();

    }

    //pojawianie sięchmurki po trafieniu
    function newEvilCloud(){

      setTimeout(function(){  evilCloud.css("backgroundImage", "url(img/chmurka.png)")}, 1000);

      setTimeout(function(){  evilCloud.show()}, 2000);

    };
    //celowanie
    gameScreen.on("click", function(event){
      var top   = event.pageY;
      var left  = event.pageX;

      //powielanie kul ognia do wieloktornego strzalu
      var fireClone = fireBold.clone().insertBefore(mario);
      fireClone.css("display", "inline-block");

      //znikanie i usuniecie kuli ognia po dotarciu na miejsce
      function hideBall(ball){
        ball.fadeOut(0);
        setTimeout(function(){ ball.remove() }, 1000);

      }

      //ruch kuli
      var yClick = event.pageY;

      //ruch kuli uzelzeniony od wysokosic klikniecia, im wyzej tym wolniej ma sie kula poruszac
      if (yClick > 330) {
        var speedBall = 700;
      }else {
        var speedBall = 500;
      }
      //animacja lotu klonowanych fireballi
      fireClone.animate({ top: top, left: left }, {
        duration: speedBall,
        step    : function() {
          collision(fireClone.position(), fireBoldSize, evilCloud.position(), evilCloudSize, $(this));
          hideBall($(this));
        },
      });

    });


    //poruszanie sie bosa
    function animateCloudEvil() {

      //zmienna dla ograniczenia ruchu chmurtki, ze wzgledu na szerokosc ekranu
      var bodyWidth = $(window).width();

      var left  = Math.floor((Math.random() * (bodyWidth - 50)) + 1);
      var top   = Math.floor((Math.random() * 300) + 1);
      var speed = Math.floor((Math.random() * 2000) + 1000);
      //animacja lotu złej churki
      evilCloud.animate({ top: top, left: left }, {
        duration: speed,
        queue   : false,
        complete: animateCloudEvil
      });
    };
    animateCloudEvil();

    //event dla rury, luigi easter egg
    var counters = 0 ;
    pipe.on("click", function(e){

      counters++;
      if (counters == 1 || counters == 3 ) {
        setTimeout(function(){pipeTxt.show()},650);
        setTimeout(function(){pipeTxt.hide()},1700);
      }else if (counters == 5) {
        pipeTxt.remove();
        setTimeout(function(){luigi.show()},650);
        setTimeout(function(){luigi.hide()}, 3000);
      }


    });

    //event dla chmury, cloud easter egg
    var countCloud = 0;
    cloudEgg.on("click", function(event){
      countCloud++;

      console.log(countCloud);
      if (countCloud == 10) {
        setTimeout(function(){thunder.slideDown(80)},480);
        setTimeout(function(){thunder.hide()},650);
        setTimeout(function(){mountain.css("backgroundImage", "url(img/mountain_thounder.png)");},620);

      }else if (countCloud >= 4) {
        setTimeout(function(){cloudEgg.css("backgroundImage", "url(img/cloudEgg.png)")},480);

      }
    });

  };
});
