
$(function(){

  //posta mario i tło
  var mario = $(".mario");
  var gameScreen = $(".screen");

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
  // console.log(evilCloudSize);

  //licznik
  var countMario = $(".score_count");
  var count = 0;


  //funkcja kolizji obiektow, oraz akcja po nim
  function collision(position1, size1, position2, size2, ball) {
    if (((position1.left + size1.width)  > position2.left) &&
    ((position1.top  + size1.height) > position2.top)  &&
    ((position2.left + size2.width)  > position1.left) &&
    ((position2.top  + size2.height) > position1.top)) {


      evilCloud.remove();
      ball.remove();

      counter();


    }
  }

  //funkcja od usuwania chmurki po 0,5 s
  function evilDel() {
      setTimeout(function(){ evilCloud.remove()}, 500);
  }


  // funkcja zliczania punktow
  function counter(){
    count ++;
    if (count <= 9 ) {
      countMario.text("00000" + count);
    }else if (count <= 99 ) {
      countMario.text("0000" + count);
    }
  }
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

    evilCloud.animate({ top: top, left: left }, {
      duration: speed,
      queue   : false,
      complete: animateCloudEvil
    });
  };
  // animateCloudEvil();







});
