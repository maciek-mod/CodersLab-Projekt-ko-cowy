
$(function(){

  //posta mario i tło
  var gameScreen = $(".screen");
  var mario = gameScreen.find(".mario");
  var pipe = gameScreen.find(".pipe");
  var pipeTxt = pipe.find(".pipeTxt");
  var luigi = gameScreen.find(".luigi");
  var cloudEgg = gameScreen.find(".cloud-1");
  var thunder = gameScreen.find(".thunder");
  var thunderDead = gameScreen.find(".thunder2");
  var mountain = gameScreen.find(".mountain");
  var timeCount = gameScreen.find(".time_count");
  var marioPhone = gameScreen.find(".marioPhone");


  //kula ognia i wymiary jej
  var fireBold = gameScreen.find(".fireBold");
  var fireBoldSize ={
    height: fireBold.height(),
    width : fireBold.width()
  };
  var fireExplode = $(".fireBoldExplode");

  //zmienna dla ograniczenia ruchu chmurtki, ze wzgledu na szerokosc ekranu
  var bodyWidth = $(window).width();

  //chmurka i wymiary jej
  var evilCloud = gameScreen.find(".evilCharakter");
  var evilHit = gameScreen.find(".cloudHit");

  var evilCloudSize ={
    height: evilCloud.height(),
    width : evilCloud.width()
  };

  var screenStart = $(".screenStart");
  var btnStart = $(".btnStart");
  var startText = $(".StartText");
  var endScreen = gameScreen.find(".screenEnd");
  var endTxt = gameScreen.find(".endTxt");
  var gameOver = gameScreen.find(".gameOver");

  //licznik
  var countMario = $(".score_count");
  var count = 0;

  //dzwięki
  var fire = document.createElement("audio");
  fire.src="sound/smb_fireball.mp3";
  fire.volume=0.70;
  fire.autoPlay=false;
  fire.preLoad=true;

  var explode = document.createElement("audio");
  explode.src="sound/bomb.mp3";
  explode.volume=0.70;
  explode.autoPlay=false;
  explode.preLoad=true;

  var world = document.createElement("audio");
  world.src="sound/world.mp3";
  world.volume=0.60;
  world.autoPlay=false;
  world.preLoad=true;
  world.loop=true;

  var thunderSound = document.createElement("audio");
  thunderSound.src="sound/thunder.mp3";
  thunderSound.volume=0.90;
  thunderSound.autoPlay=false;
  thunderSound.preLoad=true;

  var angryluigi = document.createElement("audio");
  angryluigi.src="sound/angryLuigi.mp3";
  angryluigi.volume=0.70;
  angryluigi.autoPlay=false;
  angryluigi.preLoad=true;

  var soundDie = document.createElement("audio");
  soundDie.src="sound/mariodie.mp3";
  soundDie.volume=0.80;
  soundDie.autoPlay=false;
  soundDie.preLoad=true;

  // start gry
  btnStart.on("click", function(e){
    screenStart.fadeOut(500);
    setTimeout(function(){startText.show()}, 600);
    setTimeout(function(){startText.hide()}, 950);
    setTimeout(function(){startGame()}, 1000);

  });

  function deadMario(text1, text2){
    world.pause();
    setTimeout(function(){mario.css("backgroundImage", "url(img/marioGhost.png)")},500);
    setTimeout(function(){marioPhone.css("backgroundImage", "url(img/marioGhost.png)")},500);
    setTimeout(function(){soundDie.play()},500);
    setTimeout(function(){endScreen.css("visibility", "visible")},3000);
    setTimeout(function(){gameOver.text(text1)},3500);
    setTimeout(function(){endTxt.text(text2)},3500);
  }


  //polozenie kuli ognia na starcie
  var leftFireFirst = fireBold.css("left");
  var leftFire = parseInt(leftFireFirst) - 65;
  // startGame();
  function startGame(){

    world.play();
    timer(300);

    //licznik
    function timer(counter){

      var timeid = setInterval(function() {
        counter--;
        if(counter < 0) {
          clearInterval(timeid);
        } else {
          timeCount.text(counter);
          if (counter == 000) {
            world.pause();
            setTimeout(function(){endScreen.css("visibility", "visible")},1000);
            setTimeout(function(){gameOver.text("GAME OVER")},1500);
            setTimeout(function(){endTxt.text("Osiagnales wynik "+countMario.text() +" pkt")},1500);
          }
        }
      }, 1000);

    }

    //obracanie mario i przerzucanie fireballa na druga reke w wersji od tableta w gore
    gameScreen.on("mousemove",  function(event){
      var mouseX = event.pageX;
      if (bodyWidth>768) {
        if ((bodyWidth/2)<mouseX) {
          fireBold.css({
            "left": leftFireFirst,
            "top": fireBold.position().top
          });
          mario.removeClass("mirror");
          marioPhone.removeClass("mirror");
        }else {
          fireBold.css({
            "left": leftFire,
            "top": fireBold.css("top")
          });
          mario.addClass('mirror');
          marioPhone.addClass("mirror");
        }

      }

    });

    //funkcja kolizji obiektow, oraz akcja po nim
    function collision(position1, size1, position2, size2) {
      //if kasujacy bug odnosnie niewystepowania position2.lef przy wieloktornym klikaniu LPM w miejscu evil cloud
      if (position2) {
        if (((position1.left + size1.width)  > position2.left) &&
        ((position1.top  + size1.height) > position2.top)  &&
        ((position2.left + size2.width)  > position1.left) &&
        ((position2.top  + size2.height) > position1.top)) {

          var hitEvilCloud = $(".evilCharakter");
          var posExplosion = hitEvilCloud.position();
          //dzwiek wybuchu evil cloud
          explode.play();
          animateHit(posExplosion.left, posExplosion.top);
          hitEvilCloud.remove();

          //uruchomienie licnzika pkt jak zaistniała kolizja 2 obiektow
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
        fps: 20,
        animations: {
          walkRight: [0, 1, 2, 3, 4, 5],
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

    // znikanie i usuniecie kuli ognia po dotarciu na miejsce
    function hideBall(ball){
      ball.fadeOut(0);
      setTimeout(function(){ ball.addClass("fireBoldExplode") }, 500);
      setTimeout(function(){ ball.remove() }, 700);

    }

    //celowanie
    gameScreen.on("click",  function(event){

      //znalezienie evil clouda, aby przekazac jego wspolrzedne do funkcji collision
      var evilCloudClone = $(".evilCharakter");

      //wspolrzedne x y klikniecia
      var top   = event.pageY;
      var left  = event.pageX;

      //optymalziacja gry, mario będzie wypuszczał tylko jedną kule, a kolejna po zniknieciu wystrzelonej
      var sumFire = $(".fireBold").length;

      if (1 >= sumFire) {

        //zmiana pozycji do strzału
        mario.addClass("marioFire");

        setTimeout(function(){mario.removeClass("marioFire")}, 100);
        //dzwiek strzalu
        fire.play();
        //powielanie kul ognia do wieloktornego strzalu
        var fireClone = fireBold.clone().insertBefore(mario);
        fireClone.css("visibility", "visible");

        //animacja krecenia sie kuli w locie
        fireClone.animateSprite({
          fps: 24,
          animations: {
            walkRight: [0, 1, 2],
          },
          loop: true,

        });

        //ruch kuli uzelzeniony od wysokosic klikniecia, im wyzej tym wolniej ma sie kula poruszac
        var yClick = event.pageY;
        if (yClick > 330) {
          var speedBall = 750;
        }else {
          var speedBall = 550;
        }

        //animacja lotu klonowanych fireballi, if odnosnie kolizji, ma nstepowac na wysokosci wystepowania evil Cloud (unikniecie buga)
        if (yClick < 300) {
          fireClone.animate({ top: top, left: left }, {
            duration: speedBall,
            step    : function() {
              collision(fireClone.position(), fireBoldSize, evilCloudClone.position(), evilCloudSize);
              hideBall($(this));
            },
          });
        }else {
          fireClone.animate({ top: top, left: left }, {
            duration: speedBall,
            step    : function() {
              hideBall($(this));
            },
          });

        }
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
      setTimeout(function(){evilCloudClone.remove()},(speed - 100));
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
        setTimeout(function(){angryluigi.play()},650);
        setTimeout(function(){luigi.hide()}, 3000);
      }

    });

    //event dla chmury, cloud easter egg
    var countCloud = 0;

    cloudEgg.on("click", function(event){
      var gameOverTxt = "GAME OVER";
      var textThunder = "Synek i na co ci to bylo!!!";
      countCloud++;
      if (countCloud == 7) {
        setTimeout(function(){thunderSound.play();}, 480);
        setTimeout(function(){thunderDead.show(80)},480);
        setTimeout(function(){thunderDead.hide()},650);
        deadMario(gameOverTxt, textThunder);
      }else if (countCloud == 4) {
        setTimeout(function(){thunderSound.play();}, 480);
        setTimeout(function(){thunder.slideDown(80)},480);
        setTimeout(function(){thunder.hide()},650);
        setTimeout(function(){mountain.css("backgroundImage", "url(img/mountain_thounder.png)");},620);
      }else if (countCloud >= 2) {
        setTimeout(function(){cloudEgg.css("backgroundImage", "url(img/cloudEgg.png)")},480);
      }
    });

  };

});
