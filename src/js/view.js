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

    // serverからデータを受信
    ipcRenderer.on("client", (event, data) => {
        let json = $.parseJSON(data);
        displayStatus(json);
    });

    // serverからデータを受信
    ipcRenderer.on("error", (event, data) => {
        displayError(data);
    });

    // serverでサーバー起動（テスト用）
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

var displayStatus = function (json) {
    $("#speed").val(json.speed);
    $("#wheel_fr").val(json.wheel.fr);
    $("#wheel_fl").val(json.wheel.fl);
    $("#wheel_br").val(json.wheel.br);
    $("#wheel_bl").val(json.wheel.bl);
    $("#tube_r").val(json.tube.r);
    $("#tube_l").val(json.tube.l);
    $("#hz").val(json.pump);
    $("#msg").val(json.msg);
}

var displayError = function (errorMsg) {
    $("#msg").val(errorMsg);
}
