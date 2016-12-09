
$(function(){

  //elementy DOM
  var mainScreen = $(".MainScreen");
  var fixed = $(".fixed");
  var htmlScen = $(".htmlScen");
  var bitMan = htmlScen.find(".bitman");
  var desk = htmlScen.find(".desk");
  var mario = htmlScen.find(".mario");
  var htmlCss = htmlScen.find('.htmlCss');
  var scrollIcon = htmlScen.find(".scrollIcon");
  var animTxt = htmlScen.find(".animatTxt");

  //kiedy ktos odwiezy strone, wracamy do samej gory;
  $(window).bind('beforeunload',function(){
    $(this).scrollTop(0);
  });


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
        left: "57%"
      },1500);
    },500);
  };

  function animSlide(){
    animTxt.animate({
      opacity: 'show',
      top: "46%"
    },1000);
  };


  //terminal text html css
  htmlCss.typeIt();

  $( window ).on("scroll", function(event) {
    //okreslenie pozycji top i naped animacji
    var pos =  fixed.offset().top;

    scrollIcon.fadeOut(1000);

    console.log(pos);
    if (300<pos){
      htmlscen();
      bitMan.removeClass("bitmanKey");
      if (750<pos) {
        animSlide();
      }else if (700<pos) {
        bitMan.removeClass("bitmanKey");
        bitMan.css("backgroundImage","url(img/8bitMen_down.png)");
      }else if (500<pos && bitMan.position().left > 399) {
        bitMan.css("backgroundImage","url(img/8bitMen_key.png)");
        bitMan.addClass("bitmanKey");
      }else if (400<pos){
        htmlCss.fadeOut(1500);
        deskSlide();
      }

    }


  });
});
