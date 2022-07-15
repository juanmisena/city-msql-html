$(document).ready(function () {
  getViewPass();
  getResetPass();
  getDecryptUser();
  getViewPass2();
  getViewPass3();
});
function getViewPass() {
  var change = $("#change");
  var i = $("#i");
  $(change).click(function () {
    if ($(i).hasClass("bi-eye-fill")) {
      $("#pass_user").attr("type", "text");
      $(i).removeClass("bi-eye-fill");
      $(i).addClass("bi-eye-slash-fill");
    } else if($(i).hasClass("bi-eye-slash-fill")) {
      $("#pass_user").attr("type", "password");
      $(i).removeClass("bi-eye-slash-fill");
      $(i).addClass("bi-eye-fill");
    }
  });
}
function getResetPass() {
  var pass_reset = $("#pass_reset");
  $(pass_reset).click(function () {
    Swal.fire({title: "Username", text: "please enter a this to check if it exists or not", input: "text", showCancelButton: true}).then((result) => {
      var nuser = result.value;
      if (nuser.length > 0) {
        Swal.fire({icon: "success", title: "send", timer: 1500});
        $.get("/passresetuni", {user: nuser},
        function (data, textStatus, jqXHR) {
          if (data == false) {
            Swal.fire({icon: "error", title: "Oops...", text: "the username not exists"});
          } else {
            var id_user = data.id_user;
            id_user = id_user.toString();
            var hashEncrypt = CryptoJS.AES.encrypt(id_user, "secret");
            var encryptString = hashEncrypt.toString();
            // console.log(encryptString);
            localStorage.setItem('user', JSON.stringify({id_user: encryptString}));
            window.location.href = "/passreset";
          }
        }
        );
      } else {
        Swal.fire({icon: "error", title: "Empty...", text: "please write the username"});
      }
    });
  });
}
function getDecryptUser() {
  var user = $.parseJSON(localStorage.getItem('user'));
  var id_user = user.id_user;
  var hashDecrypt = CryptoJS.AES.decrypt(id_user, "secret");
  var decryptString = hashDecrypt.toString(CryptoJS.enc.Utf8);
  id_user = parseInt(decryptString);
  $("#id_user").val(id_user);
}
function getViewPass2() {
  var change2 = $("#change2");
  var i2 = $("#i2");
  $(change2).click(function () { 
    if ($(i2).hasClass("bi-eye-fill")) {
      $(i2).removeClass("bi-eye-fill");
      $(i2).addClass("bi-eye-slash-fill");
      $("#new_pass_user").attr("type", "text");
      $("#conf_pass_user").attr("type", "text");
    } else if($(i2).hasClass("bi-eye-slash-fill")) {
      $(i2).removeClass("bi-eye-slash-fill");
      $(i2).addClass("bi-eye-fill");
      $("#new_pass_user").attr("type", "password");
      $("#conf_pass_user").attr("type", "password");
    }
  });
}
function getViewPass3() {
  var change3 = $("#change3");
  var i3 = $("#i3");
  $(change3).click(function () { 
    if ($(i3).hasClass("bi-eye-fill")) {
      $(i3).removeClass("bi-eye-fill");
      $(i3).addClass("bi-eye-slash-fill");
      $("#new_pass_user").attr("type", "text");
      $("#conf_pass_user").attr("type", "text");
    } else if($(i3).hasClass("bi-eye-slash-fill")) {
      $(i3).removeClass("bi-eye-slash-fill");
      $(i3).addClass("bi-eye-fill");
      $("#new_pass_user").attr("type", "password");
      $("#conf_pass_user").attr("type", "password");
    }
  });
}
$("#formNewPass").submit(function (e) { 
  e.preventDefault();
  var id_user = $("#id_user").val();
  var new_pass_user = $("#new_pass_user").val();
  var conf_pass_user = $("#conf_pass_user").val();
  if (new_pass_user != conf_pass_user || new_pass_user.trim().length == 0 || conf_pass_user.trim().length == 0) {
    Swal.fire({icon: "error", title: "Oops..", text: "the values must is equals or not must to space"});
  } else {
    Swal.fire({icon: "success", title: "send", timer: 1500});
    var ltr = new_pass_user.replace(/ /g, "");
    new_pass_user = ltr;
    const postPassUser = {id_user: id_user, pass_user: new_pass_user}
    $.post("/passreset", postPassUser,
      function (data, textStatus, jqXHR) {
        if (data == "ok") {
          window.location.href = "/login";
        }
      }
    );
  }
  $("#formNewPass").trigger("reset");
});