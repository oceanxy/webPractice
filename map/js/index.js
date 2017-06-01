window.onload = function() {
    document.documentElement.oncontextmenu = function (ev) {
        ev = ev || window.event;
        var target = ev.srcElement || ev.target;
        if(target.className === "map"){
            if(ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }

            if(ev.button == 2){
                $(".rkey_menu").css({"top": ev.clientY, "left": ev.clientX}).show();
            }
            return false;
        }
    };
};
$(document).on("click", function () {
    $(".rkey_menu").hide();
});

$(".searchbox-input").on({
    focus: function () {
        $(".searchbox_history").show();
    },
    blur: function () {
        setTimeout(function () {
            $(".searchbox_history").hide();
        }, 100);
    }
});

$(".searchbox-line").on("click", function () {
    $(".line_list").show();
});
$(".line-close").on("click", function () {
    $(".line_list").hide();
});

$(".city_toggle").on("click", function () {
    $(".city_list").toggle();
});
$(".city_list_close").on("click", function () {
    $(".city_toggle").click();
});

//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(106.557165,29.570997);//定义一个中心点坐标
    map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    // var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    // map.addControl(ctrl_nav);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

initMap();//创建和初始化地图