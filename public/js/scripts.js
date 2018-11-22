//client side functions
$(document).ready(() => {
if ($("#infoLink").length !=0){
  getUser();
}
  $('#loginForm').submit((e) => {
    e.preventDefault();
  });
  $('#updateUserForm').submit((e) => {
    e.preventDefault();
  });
  $('#createUserForm').submit((e) => {
    e.preventDefault();
  });
  $('#deleteUserForm').submit((e) => {
    e.preventDefault();
  });

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
  $('#createBtn').click(() => {
    if($('#fName').val() != '' && $('#lName').val() != ''&& $('#email').val()!='' && $('#password').val()!='' && $('#passwordConf').val()!='') {
      var fName = $('#fName').val();
      var lName = $('#lName').val();
      var email =  $('#email').val();
      var password =  $('#password').val();
      var passwordConf=  $('#passwordConf').val();
      create(fName, lName, email,password, passwordConf);
    } else {
      writeMessage($('#error'), "All Fields are required...");
    }
  });
  $('#updateBtnbutton').click(() => {
    if($('#fName').val() != '' && $('#lName').val() != ''&& $('#email').val()!='' && $('#password').val()!='' && $('#passwordConf').val()!='') {
      var fName = $('#fName').val();
      var lName = $('#lName').val();
      var email =  $('#email').val();
      var password =  $('#password').val();
      var passwordConf=  $('#passwordConf').val();
      update(fName, lName, email,password, passwordConf);
    } else {
      writeMessage($('#error'), "All Fields are required...");
    }
  });
  $('#deleteBtn').click(() => {
    deleteUser();
  });
});

//AJAX GET Request - getting user infoLink
function getUser() {
  $.ajax({
    type: 'GET',
    url: '/user/findUser',

    statusCode: {
      400: (err) => {
        writeMessage($('#error'),err.responseText);
      },

     200: (user) => {
       writeElement($('#email'), user.email);
       writeElement($('#userName'), user.firstName + ' ' + user.lastName);
       writeElement($('#infoLink'), 'Welcome Back, ' + user.firstName + ' ' + user.lastName);
       if(user.bio){
         writeElement($('#bio'), user.bio);
       }else {
         show($('addBioBtnbutton'));
         hide($('bio'));
       }
       if(user.city && user.state){
         writeElement($('#geoInfop'), user.city + ', ' + user.state);
       }else {
         show($('addBioBtnbutton'));
          hide($('geoInfop'));
       }
       if(user.profileImagePath){
         hide($('profileImageBtnbutton'));
       }else {
         show($('profileImageBtnbutton'));
       }
     }
  },
      contentType: "application/json",
      dataType: 'json'
    });
  }

// AJAX POST request - Login
function login(email, password) {
  $.ajax({
    type: 'POST',
    url: '/user/login',
    data: JSON.stringify({
      'email': email,
      'password': password
    }),
    statusCode: {
      401: (err) => {
        writeMessage($('#error'),err.responseText);
      },

     200: (user) => {
       document.location.href="/profile";
     }
  },
      contentType: "application/json",
      dataType: 'json'
    });
  }

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
    // AJAX PUT request - Update
    function update(fName, lName, email, password, passwordConf) {
      alert(password);
      $.ajax({
        type: 'PUT',
        url: '/user/update',
        data: JSON.stringify({
          'firstName': fName,
          'lastName': lName,
          'email': email,
          'password': password,
          'passwordConf': passwordConf
        }),
        statusCode: {
          400: (err) => {
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

  // AJAX DELETE - Delete User
  function deleteUser() {
    alert("delete");
    $.ajax({
      type: 'DELETE',
      url: '/user/delete',
      success: (user) => {
        document.location.href="/";
      },
      statusCode: {
        500: (err) => {
          writeMessage($('#error'),err.responseText);
        },

       200: (user) => {
         document.location.href="/";
       }
    },
        contentType: "application/json",
        dataType: 'json'
      });
    }

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
      if(!element.hasClass('hidden')){
        element.toggleClass("hidden");
      }
    }
