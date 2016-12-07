
$(function(){


  //posta mario i tło
  var gameScreen = $(".screen");
  var mario = gameScreen.find(".mario");
  var pipe = gameScreen.find(".pipe");
  var pipeTxt = pipe.find(".pipeTxt");
  var luigi = gameScreen.find(".luigi");
  var cloudEgg = gameScreen.find(".cloud-1");
  var thunder = gameScreen.find(".thunder");
  var mountain = gameScreen.find(".mountain");

  //kula ognia i wymiary jej
  var fireBold = gameScreen.find(".fireBold");
  var fireBoldSize ={
    height: fireBold.height(),
    width : fireBold.width()
  };
  // console.log(fireBoldSize);

  //chmurka i wymiary jej
  var evilCloud = gameScreen.find(".evilCharakter");
  var evilHit = gameScreen.find(".cloudHit");

  var evilCloudSize ={
    height: evilCloud.height(),
    width : evilCloud.width()
  };

  var screenStart = gameScreen.find(".screenStart");
  var btnStart = screenStart.find(".btnStart");
  var startText = gameScreen.find(".StartText");


  //licznik
  var countMario = $(".score_count");
  var count = 0;



  // btnStart.on("click", "div", function(e){
  // screenStart.fadeOut(500);
  // setTimeout(function(){startText.show()}, 600);
  // setTimeout(function(){startText.hide()}, 950);
  // setTimeout(function(){startGame()}, 1000);

  // });


  //funkcja kolizji obiektow, oraz akcja po nim
  function collision(position1, size1, position2, size2, evil) {
    if (position2) {
      if (((position1.left + size1.width)  > position2.left) &&
      ((position1.top  + size1.height) > position2.top)  &&
      ((position2.left + size2.width)  > position1.left) &&
      ((position2.top  + size2.height) > position1.top)) {

        var posExplosionY = $(".evilCharakter").position().left;
        var posExplosionX = $(".evilCharakter").position().top;
        animateHit(posExplosionY, posExplosionX);

        $(".evilCharakter").remove();


        //uruchomienie licnzika jak zaistniała kolizja 2 obiektow
        if (collision) {
          counter();
        }
      }
    }
  }

  //funkcja animacji wybuchu evil cloud
  function animateHit(left, top){
    var evilHitClone = evilHit.clone().insertBefore(mario);
    evilHitClone.css({
      "left": left,
      "top": top
    }).css("display", "inline-block");
    evilHitClone.animateSprite({
      fps: 12,
      animations: {
        walkRight: [0, 1, 2, 3, 4, 5, 6, 7],
      },

    });
  };


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
  }

  //znikanie i usuniecie kuli ognia po dotarciu na miejsce
  function hideBall(ball){
    ball.fadeOut(0);
    setTimeout(function(){ ball.remove() }, 700);

  }


  //celowanie
  gameScreen.on("click",  function(event){

    //znalezienie evil clouda, aby przekazac jego wspolrzedne do funkcji collision
    var evilCloudClone = $(".evilCharakter");


    var top   = event.pageY;
    var left  = event.pageX;

    //optymalziacja gry, mario będzie wypuszczał tylko jedną kule, a kolejna po zniknieciu wystrzelonej
    var sumFire = $(".fireBold").length;

    if (1 >= sumFire) {
      //powielanie kul ognia do wieloktornego strzalu
      var fireClone = fireBold.clone().insertBefore(mario);
      fireClone.css("display", "inline-block");

      //ruch kuli uzelzeniony od wysokosic klikniecia, im wyzej tym wolniej ma sie kula poruszac
      var yClick = event.pageY;
      if (yClick > 330) {
        var speedBall = 550;
      }else {
        var speedBall = 350;
      }

      //animacja lotu klonowanych fireballi
      fireClone.animate({ top: top, left: left }, {
        duration: speedBall,
        step    : function() {
          collision(fireClone.position(), fireBoldSize, evilCloudClone.position(), evilCloudSize);
          hideBall($(this));
        },
      });
    }

  });


  //poruszanie sie bosa
  function animateCloudEvil() {
    //losowanie x y dla pojawiającej sie Evil Cloud
    var leftFirst  = Math.floor((Math.random() * (bodyWidth - 50)) + 1);
    var topFirst  = Math.floor((Math.random() * 300) + 1);

    //wstawianie do dom klonu evil cloud
    var evilCloudClone = evilCloud.clone().insertBefore(mario);

    //ustalenie startowa pozycje evil cloud
    evilCloudClone.css({
      "left": leftFirst,
      "top": topFirst
    });
    evilCloudClone.css("display", "inline-block");
    setTimeout

    //zmienna dla ograniczenia ruchu chmurtki, ze wzgledu na szerokosc ekranu
    var bodyWidth = $(window).width();

    //losowanie x y i speed
    var left  = Math.floor((Math.random() * (bodyWidth - 50)) + 1);
    var top   = Math.floor((Math.random() * 300) + 1);
    var speed = Math.floor((Math.random() * 2000) + 1000);

    //animacja lotu evil cloud
    evilCloudClone.animate({ top: top, left: left }, {
      duration: speed,
      queue   : false,
      complete: animateCloudEvil
    });
    //usuwanie nietrafionej chmurki z DOM, po czasie lotu
    setTimeout(function(){evilCloudClone.remove()},speed);
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



});
