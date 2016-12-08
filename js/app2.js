
$(function(){

  //elementy DOM
  var mainScreen = $(".MainScreen");
  var fixed = $(".fixed");
  var htmlScen = $(".htmlScen");
  var bitMan = htmlScen.find(".bitman");
  var desk = htmlScen.find(".desk");
  var mario = htmlScen.find(".mario");

  //poszczegolne ruchy

  function htmlscen(){
    bitMan.animate({
      opacity: 'show',
      left: "39%"
    },1500);
  };

  function deskSlide(){
    desk.animate({
      opacity: 'show',
      left: "37%"
    },1500);
    setTimeout(function(){
      mario.animate({
        opacity: 'show',
        left: "52%"
      },1500);
    },500);
  };


  $( window ).on("scroll", function(event) {
    //okreslenie pozycji top i naped animacji
    var pos =  fixed.offset().top;
    console.log(pos);
    if (500<pos){
      htmlscen();
      bitMan.removeClass("bitmanKey");
      if (1200<pos) {
        bitMan.removeClass("bitmanKey");
        bitMan.css("backgroundImage","url(img/8bitMen_down.png)");
      }else if (900<pos) {
        bitMan.css("backgroundImage","url(img/8bitMen_key.png)");

        bitMan.addClass("bitmanKey");
      }else if (600<pos){
        deskSlide();
      }

    }

  });

});
