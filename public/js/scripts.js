//client side functions
$(document).ready(() => {
  $('#switchToReg').click(() => {
    hide($('#loginForm'));
    show($('#RegForm'));
  });

  $('#switchToLogin').click(() => {
    show($('#loginForm'));
    hide($('#RegForm'));
  });

//general helper functions
    function writeMessage(element, text){
      if(element.hasClass('hidden')){
        element.toggleClass("hidden");
        element.html('<strong>' + text + '</strong>');
      }else {
        element.html('<strong>' + text + '</strong>');
      }
    }
    function writeElement(element, text){
      element.html(text);
    }

    function hide(element){
        if(!element.hasClass('hidden')){
          element.toggleClass("hidden");
        }
    }
    function show(element){
      if(element.hasClass('hidden')){
        element.toggleClass("hidden");
      }
    }
  });
