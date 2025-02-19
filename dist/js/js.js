"use strict";
function getHash() {
  return location.hash ? location.hash.substring(1) : "";
}
function set(t, o) {
  (localStorage["allso_" + t] = o),
    3 == o
      ? ((set_url[t] = "https://www.google.com/search?igu=1&q="), (set_top[t] = -88), (set_left[t] = -120), (set_foot[t] = 127))
      : 1 == o
      ? ((set_url[t] = "https://www.haosou.com/s?q="), (set_top[t] = 0), (set_left[t] = 0), (set_foot[t] = 80))
      : 2 == o
      ? ((set_url[t] = "https://cn.bing.com/search?setmkt=zh-cn&setlang=zh-cn&q="), (set_top[t] = -72), (set_left[t] = -80), (set_foot[t] = 60))
      : 0 == o && ((set_url[t] = "https://www.baidu.com/s?wd="), (set_top[t] = -45), (set_left[t] = -100), (set_foot[t] = 80)),
    (need_respond = !0);
}
function change_state(t) {
  0 == localStorage.allso_state ? (localStorage.allso_state = t ? -1 : 1) : (localStorage.allso_state = 0), respond(), 0 == localStorage.allso_state && so();
}
function respond() {
  var t = $("body").width(),
    o = $(window).height(),
    s = $("nav.navbar").height(),
    e = t / 2;
  0 == localStorage.allso_state
    ? (obja.fadeIn("fast").animate({ "margin-left": set_left[0], width: e - set_left[0] }, "fast"),
      objb.fadeIn("fast").animate({ "margin-left": e + set_left[1], width: e - set_left[1] }, "fast"),
      (objProgress[0].style.width = "50%"),
      (objProgress[1].style.width = "50%"))
    : localStorage.allso_state < 0
    ? (obja.fadeIn("fast").animate({ "margin-left": set_left[0], width: t - set_left[0] }, "fast"), objb.fadeOut("fast"), (objProgress[0].style.width = "75%"), (objProgress[1].style.width = "25%"))
    : (obja.fadeOut("fast"), objb.fadeIn("fast").animate({ "margin-left": set_left[1], width: t - set_left[0] }, "fast"), (objProgress[0].style.width = "25%"), (objProgress[1].style.width = "75%")),
    obja.animate({ "margin-top": set_top[0] + s, height: o - set_top[0] - s + set_foot[0] }, "fast"),
    objb.animate({ "margin-top": set_top[1] + s, height: o - set_top[1] - s + set_foot[1] }, "fast"),
    (need_respond = !1);
}
function so() {
  if ("" !== $.trim(soinput_obj[0].value)) {
    (obja[0].src = ""), (objb[0].src = "");
    var t = soinput_obj[0].value,
      o = encodeURIComponent(t);
    0 == localStorage.allso_state ? ((objb[0].src = set_url[1] + o), (obja[0].src = set_url[0] + o)) : localStorage.allso_state < 0 ? (obja[0].src = set_url[0] + o) : (objb[0].src = set_url[1] + o),
      (location.hash = t),
      (window.document.title = t + " - ALLSO");
  } else (location.hash = ""), (window.document.title = "ALLSO - 聚合搜索引擎");
  need_respond && respond(),
    objProgress.addClass("progress-bar-striped active"),
    window.setTimeout(function () {
      objProgress.removeClass("progress-bar-striped active");
    }, 2e3);
}
if ($(window).width() < 770) {
  var get_answer = confirm(
    "ALLSO 是一个聚合性搜索引擎，可以同时对 2 个搜索引擎展开搜索，页面一分为二，充分利用屏幕资源。\n\n然而。。。\n\n你的屏幕实在是太小了，请在电脑或平板上使用 ALLSO，相信会带给你一份相当棒的体验！\n\nhttp://h2y.github.io/allso/\n\n----------\n点击[是]，将跳转到必应手机版："
  );
  if (get_answer) {
    var hash = getHash();
    hash ? (window.location.href = "https://cn.bing.com/search?setmkt=zh-cn&setlang=zh-cn&q=" + hash) : (window.location.href = "https://cn.bing.com/");
  }
}
var soinput_obj = $("#soinput"),
  objProgress = $("div.progress>div"),
  obja = $("#a"),
  objb = $("#b"),
  obj_autoSO = $("#autoSO"),
  autoSO = !0,
  need_respond = !0,
  obj_list1_buttons = $("td.set-list-1 button"),
  obj_list2_buttons = $("td.set-list-2 button"),
  set_url = [],
  set_top = [0, 0],
  set_left = [0, 0],
  set_foot = [0, 0];
respond(),
  void 0 === localStorage.allso_autoSO
    ? ((localStorage.allso_autoSO = !0), (obj_autoSO[0].checked = !0), (autoSO = !0))
    : ((obj_autoSO[0].checked = "true" === localStorage.allso_autoSO), (autoSO = obj_autoSO[0].checked)),
  void 0 == localStorage.allso_0
    ? (set(0, 3), obj_list1_buttons.eq(3).removeClass("btn-info").addClass("btn-danger"))
    : (set(0, localStorage.allso_0), obj_list1_buttons.eq(localStorage.allso_0).removeClass("btn-info").addClass("btn-danger")),
  void 0 == localStorage.allso_1
    ? (set(1, 2), obj_list2_buttons.eq(1).removeClass("btn-warning").addClass("btn-success"))
    : (set(1, localStorage.allso_1), obj_list2_buttons.eq(localStorage.allso_1).removeClass("btn-warning").addClass("btn-success")),
  obj_list1_buttons.click(function () {
    obj_list1_buttons.removeClass("btn-danger").addClass("btn-info"), $(this).removeClass("btn-info").addClass("btn-danger");
  }),
  obj_list2_buttons.click(function () {
    obj_list2_buttons.removeClass("btn-success").addClass("btn-warning"), $(this).removeClass("btn-warning").addClass("btn-success");
  }),
  obj_autoSO.change(function () {
    (localStorage.allso_autoSO = this.checked), (autoSO = this.checked);
  }),
  (function () {
    if (location.hash) {
      var t = getHash();
      (t = decodeURIComponent(t).replace(/\+/g, " ")), (soinput_obj[0].value = t), so();
    }
  })(),
  void 0 == localStorage.allso_state && (localStorage.allso_state = 0),
  $(window).resize(function () {
    respond();
  }),
  soinput_obj.on("input", function () {
    autoSO && so();
  }),
  $("div.loading").fadeOut("fast");
//# sourceMappingURL=js.js.map
