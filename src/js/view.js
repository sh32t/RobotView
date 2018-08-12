const $ = require("jquery");
const { ipcRenderer } = require("electron");

// JQuery
$(function () {
    // 初期表示
    var switchController = "robot";
    $("#title").text("ロボット");
    displayRobotBack();
    displayRobotButton();

    // selectで切り替え
    $("#select_button").click(function (e) {
        if (switchController === "robot") {
            $("#title").text("ポンプ");
            displayPumpBack();
            displayPumpButton();
            switchController = "pump";
        } else {
            $("#title").text("ロボット");
            displayRobotBack();
            displayRobotButton();
            switchController = "robot";
        }
    });

    // clientでクライアント起動
    $("#client_button").click(function (e) {
        ipcRenderer.send("client");
    });

    // serverでサーバー起動
    $("#server_button").click(function (e) {
        ipcRenderer.send("server");
    });

});

var displayRobotBack = function(){
    $("#title").addClass("color_robot");
    $("#robot").addClass("color_robot");
    $("#title").removeClass("color_pump");
    $("#pump").removeClass("color_pump");
};

var displayPumpBack = function () {
    $("#title").addClass("color_pump");
    $("#pump").addClass("color_pump");
    $("#title").removeClass("color_robot");
    $("#robot").removeClass("color_robot");
};

var displayRobotButton = function () {
    $("#label_maru").text("スタート");
    $("#label_batsu").text("");
    $("#label_sikaku").text("ストップ");
    $("#label_sankaku").text("");
    $("#label_right").text("");
    $("#label_down").text("スピードダウン");
    $("#label_left").text("");
    $("#label_up").text("スピードアップ");
    $("#label_r1").text("チューブ微調整右");
    $("#label_r2").text("");
    $("#label_l1").text("チューブ微調整左");
    $("#label_l2").text("");
    $("#label_select").text("");
    $("#label_start").text("");
    $("#label_stick_right").text("");
    $("#label_stick_left").text("");
};

var displayPumpButton = function () {
    $("#label_maru").text("スタート");
    $("#label_batsu").text("設定変更");
    $("#label_sikaku").text("ストップ");
    $("#label_sankaku").text("");
    $("#label_right").text("");
    $("#label_down").text("");
    $("#label_left").text("");
    $("#label_up").text("");
    $("#label_r1").text("");
    $("#label_r2").text("");
    $("#label_l1").text("");
    $("#label_l2").text("");
    $("#label_select").text("");
    $("#label_start").text("");
    $("#label_stick_right").text("");
    $("#label_stick_left").text("");
};
