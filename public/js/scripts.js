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

//prevent forms from submitting
  $('#loginForm').submit((e) => {
    e.preventDefault();
  });
  $('#RegForm').submit((e) => {
    e.preventDefault();
  });

  //form submit
  $('#loginBtn').click(() => {
    if($('#logemail').val()!='' && $('#logpassword').val()!='') {
      var email =  $('#logemail').val();
      var password =  $('#logpassword').val();
      $('#logemail').val('');
      $('#logpassword').val('');
      login(email,password);
    } else{
        writeMessage($('#error'), "All Fields are required...");
    }
  });

  $('#regBtn').click(() => {
    if($('#fName').val() != '' && $('#lName').val() != ''&& $('#regEmailAddy').val()!='' && $('#regPass').val()!='' && $('#regPassConf').val()!='') {
      var fName = $('#fName').val();
      var lName = $('#lName').val();
      var email =  $('#regEmailAddy').val();
      var password =  $('#regPass').val();
      var passwordConf=  $('#regPassConf').val();
      create(fName, lName, email,password, passwordConf);
    } else {
      writeMessage($('#error'), "All Fields are required...");
    }
  });

  //AJAX Calls

  // AJAX PUT request - Create
  function create(fName, lName, email, password, passwordConf) {
    $.ajax({
      type: 'PUT',
      url: '/user/create',
      data: JSON.stringify({
        'firstName': fName,
        'lastName': lName,
        'email': email,
        'password': password,
        'passwordConf': passwordConf
      }),
      statusCode: {
        400: (err) => {
          console.log(err.responseText);
          writeMessage($('#error'),err.responseText);
        },

       201: (user) => {
         document.location.href="/profile";
       }
    },
        contentType: "application/json",
        dataType: 'json'
      });
    }


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

    function writeMessage(element, text){
      if(element.hasClass('hidden')){
        element.toggleClass("hidden");
        element.html('<strong>' + text + '</strong>');
      }else {
        element.html('<strong>' + text + '</strong>');
      }
    }
  });
