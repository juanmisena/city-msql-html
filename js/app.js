const tbody = $("#tbody");
const tbodyDep = $("#tbodyDep");
var tr = $(tbody).children();
var trDep = $(tbodyDep).children();
const form_select = $("#inputGroupSelect01");
const edit_form_select = $("#inputGroupSelect02");
var optionChoose = $(form_select).find("#child1");
var optionSelect = $(form_select).find("#child2");
var firstOption = $(edit_form_select).find("#option1");
var lastOption = $(edit_form_select).find("#option2");
var bookmark = {};
$(document).ready(function () {
  ajaxData();
  printSelectDep();
  getListDep();
  getEditDep();
  getEditCity();
  getLoggedIn();
});
async function ajaxData() {
  try {
    const res = await $.getJSON("/list");
    printTable(res);
  } catch (err) {
    console.error(err);
  }
}
function printTable(res) {
  $(tbody).html("");
  $.each(res, function (i, item) { 
    $(tr).find("th").text((i + 1));
    $(tr).find("td:eq(0)").text(item.name_ci);
    $(tr).find("td:eq(1)").text(item.name_dep);
    $(tr).find(".btn-info").attr("mark", item.id_ci);
    $(tr).find(".btn-danger").attr("dial", item.id_ci);
    const clone = $(tr).clone(true);
    $(tbody).append(clone);
  });
}
function printSelectDep() {
  $.get("/getSelectDep", function (data, textStatus, jqXHR) {
    if (data) {
     $(form_select).html("");
     $.each(data, function (i, item) {
      $(optionSelect).val(item.id_dep).text(item.name_dep);
      const clone = $(optionSelect).clone(true);
      $(form_select).append(clone).append(optionChoose);
     });
    }
  });
}
function getListDep() {
  $.get("/listdep", function (data, textStatus, jqXHR) {
    if (data) { 
      $(tbodyDep).html("");
      $.each(data, function (i, item) {
        $(trDep).find("th").text((i + 1));
        $(trDep).find("td:eq(0)").text(item.name_dep);
        $(trDep).find(".btn-info").attr("bookmark", item.id_dep);
        $(trDep).find(".btn-danger").attr("market", item.id_dep);
        const clone = $(trDep).clone(true);
        $(tbodyDep).append(clone);
      });
    }
  });
}
$(tbodyDep).click(function(e){
  if ($(e.target).hasClass("btn-danger")) {
    var id = $(e.target).attr("market");
    Swal.fire({title: "Are You Sure?", text: "if oppress this button it delete", icon: "warning", showCancelButton: true, confirmButtonColor: "#dc3545", cancelButtonColor: "#6c757d", confirmButtonText: "Yes, delete it!"}).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted", "Your Departament has been deleted.", "success");
        $.post("/deletedep/" + id, function (data, textStatus, jqXHR) {
            if (data) {
              getListDep();
            }
          }
        );
      }
    });
  }
  if ($(e.target).hasClass("btn-info")) {
    var id = $(e.target).attr("bookmark");
    $.get("/editdep/" + id, function (data, textStatus, jqXHR) {
      localStorage.setItem('bookmark', JSON.stringify(data));
      window.location.href = "/veditdep";
    });
  }
  e.stopPropagation();
});
function getEditDep() {
  bookmark = $.parseJSON(localStorage.getItem('bookmark'));
  $("#edit_id_dep").val(bookmark.id_dep);
  $("#edit_name_dep").val(bookmark.name_dep);
}
$(tbody).click(function (e) {
  if ($(e.target).hasClass("btn-danger")) {
    var id = $(e.target).attr("dial");
    Swal.fire({title: "Are You Sure?", text: "if oppress this button it delete", icon: "warning", showCancelButton: true, confirmButtonColor: "#dc3545", cancelButtonColor: "#6c757d", confirmButtonText: "Yes, delete it"}).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Delete", "Your City has been deleted.", "success");
        $.post("/deletecity/" + id, function (data, textStatus, jqXHR) {
            if (data) {
              ajaxData();
            }
          }
        );
      } 
    });
    // if (confirm('Are Your Want to Delete It?')) {
    // }
  }
  if ($(e.target).hasClass("btn-info")) {
    var id = $(e.target).attr("mark");
    $.get("/editcity/" + id, function (data, textStatus, jqXHR) {
       localStorage.setItem('mark', JSON.stringify(data));
       window.location.href = "/veditcity";
      }
    );
  }
  e.stopPropagation();
});
function getEditCity() {
  var mark = $.parseJSON(localStorage.getItem('mark'));
  var ci = mark.ci;
  var deps = mark.deps;
  var clone;
  $("#edit_id_ci").val(ci.id_ci);
  $("#edit_name_ci").val(ci.name_ci);
  $(edit_form_select).html("");
  $.each(deps, function (i, dep) {
    if (ci.id_dep == dep.id_dep) {
      $(firstOption).val(dep.id_dep).text(dep.name_dep);
    } else {
      $(lastOption).val(dep.id_dep).text(dep.name_dep);
      clone = $(lastOption).clone(true);
    }
    $(edit_form_select).append(firstOption).append(clone);
  });
}
$("#searchCity").on("input", function (e) {
  var searchCity = $(e.target).val();
  if (searchCity.length > 0) {
    $.get("/searchcity", {data: searchCity},
      function (data, textStatus, jqXHR) {
       $(tbody).html("");
       $.each(data, function (i, item) {
         $(tr).find("th").text((i + 1));
         $(tr).find("td:eq(0)").text(item.name_ci);
         $(tr).find("td:eq(1)").text(item.name_dep);
         $(tr).find(".btn-info").attr("mark", item.id_ci);
         $(tr).find(".btn-danger").attr("dial", item.id_ci);
         const clone = $(tr).clone(true);
         $(tbody).append(clone);
        });
      }
    );
  } else {
    ajaxData();
  }
});
$("#searchDep").on("input", function (e) {
  var searchDep = $(e.target).val();
  if (searchDep.length > 0) {
    $.get("/searchdep", {data: searchDep},
      function (data, textStatus, jqXHR) {
       $(tbodyDep).html("");
       $.each(data, function (i, item) { 
         $(trDep).find("th").text((i + 1));
         $(trDep).find("td:eq(0)").text(item.name_dep);
         $(trDep).find(".btn-info").attr("bookmark", item.id_dep);
         $(trDep).find(".btn-info").attr("market", item.id_dep);
         const clone = $(trDep).clone(true);
         $(tbodyDep).append(clone);
       }); 
      }
    );
  } else {
    getListDep();
  }
});
function getLoggedIn() {
  $.get("/getloggedin",
    function (data, textStatus, jqXHR) {
     $(".nav-user").html(`<i class="bi bi-person-square"></i> ${data}...`);
    }
  );
}