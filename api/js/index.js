var editor = null;//编辑器

window.onload = function () {
    document.documentElement.oncontextmenu = function (ev) {
        ev = ev || window.event;
        var target = ev.srcElement || ev.target;
        if (target.className === "map") {
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }

            if (ev.button == 2) {
                $(".rkey_menu").css({"top": ev.clientY, "left": ev.clientX}).show();
            }
            return false;
        }
    };
};
$(document).on("click", function () {
    $(".rkey_menu").hide();
});

//初始化菜单结构
function initMenu() {
    $(".api_nav").on("click", ".api_nav_toggle", function () {
        var $i = $(this).find("i"),
            $n = $(this).next();
        if ($i.is(".i_close")) {
            $n.slideUp(300);
            $i.removeClass("i_close");
        } else {
            $n.slideDown(300);
            $i.addClass("i_close");
        }
    });
}

//初始化编辑器
function initEditor() {
    if (!editor) {
        editor = CodeMirror.fromTextArea(document.getElementById("script_once_code"), {
            lineWrapping: true, //是否显示scroll
            lineNumbers: false, //是否显示number
            styleActiveLine: true,
            matchBrackets: true,
            mode: "htmlmixed"
        });
    } else {
        editor.setValue($("#script_once_code").val());
    }
    $(".CodeMirror").height($(".CodeMirror").height() - 24)
}

//拖动改变地图容器大小
function resizeBox() {
    $(".right_container").append("<div class='toggle'></div>");
    var offsetX = 0,
        $code = $(".code-box"),
        boxWidth = $code.width(),
        $toggle = $(".right_container .toggle");

    $code.on({
        mousedown: function (e) {
            e = window.event || e;
            offsetX = e.clientX;
            boxWidth = $code.width();
            if (e.clientX - $code.offset().left >= boxWidth - 2) {
                $(document).on({
                    mousemove: function (ev) {
                        ev = window.event || ev;
                        $code.css({
                            width: ev.clientX - offsetX + boxWidth,
                            borderRightStyle: "dashed"
                        });
                        $toggle.css({
                            left: ev.clientX - offsetX + boxWidth
                        });
                    },
                    mouseup: function (ev) {
                        ev = window.event || ev;
                        $code.css({
                            borderRightStyle: "solid"
                        });
                        boxWidth = ev.clientX - offsetX + boxWidth;
                        boxWidth = boxWidth < 0 ? 0 : boxWidth;
                        if (boxWidth == 0) {
                            $toggle.css({
                                left: boxWidth,
                                backgroundPositionY: -242
                            }).data("open", true);
                        } else {
                            $toggle.css({
                                backgroundPositionY: -142
                            }).data("open", false);
                        }
                        $(document).off("mousemove").off("mouseup");
                    }
                });
            }
        }
    });

    $toggle.css({left: boxWidth});
    $toggle.on("click", function () {
        if (!$(this).data("open")) {
            $code.stop(true).animate({width: 0}, 300);
            $(this).stop(true).animate({left: 0}, 300);
            $(this).data("open", true).css({backgroundPositionY: -242});
        } else {
            $code.stop(true).animate({width: boxWidth || 500}, 300);
            $(this).stop(true).animate({left: boxWidth || 500}, 300);
            $(this).data("open", false).css({backgroundPositionY: -142});
        }
    });
}

//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(106.557165, 29.570997);//定义一个中心点坐标
    map.centerAndZoom(point, 12);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    // var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    // map.addControl(ctrl_nav);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

$(function () {
    $(".api_container").height($(window).height() - $(".api_header").height());
    initMenu();
    initEditor();
    resizeBox();
    initMap();//创建和初始化地图
});