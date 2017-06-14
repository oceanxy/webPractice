(function ($, window) {
    var applicationPath = window.applicationPath == "" ? "" : window.applicationPath || "webuploader";
    var photoUrlArray = new Array();
    //保存图片url的对象
    function photoUrl(id, filePath) {
        this.id = id;
        this.filePath = filePath;
    }

    function randomNum() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    /*
     初始化WebUpload
     */
    function initWebUpload(item, options) {

        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。<a target='_blank' href='http://se.360.cn'>360浏览器</a>或者<a target='_blank' href='http://www.google.cn/intl/zh-CN/chrome/browser/'>谷歌Chrome浏览器</a>";
            if (window.console) {
                window.console.log(error);
            }
            $(item).text(error);
            return;
        }
        //默认参数初始化
        var defaults = {
            auto: false,//默认不自动上传
            onAllComplete: function (event) {
            }, // 当所有file都上传后执行的回调函数
            onComplete: function (event) {
            }, // 每上传一个file的回调函数
            innerOptions: {},
            fileNumLimit: undefined, //验证文件总数量, 超出则不允许加入队列
            fileSizeLimit: undefined, //验证文件总大小是否超出限制, 超出则不允许加入队列。
            fileSingleSizeLimit: 100 * 1024 * 1024, //验证单个文件大小是否超出限制, 超出则不允许加入队列默认100M
            PostbackHold: false,
            server: ""
        };

        var divContainer = $(item),
            opts = $.extend(defaults, options),
            pickerid = "",
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            // 缩略图大小
            thumbnailWidth = 90 * ratio,
            thumbnailHeight = 90 * ratio;

        if (typeof guidGenerator36 != 'undefined') //给一个唯一ID
        {
            pickerid = guidGenerator36();
        } else {
            pickerid = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        var uploaderStrdiv;
        if (opts.auto) {
            uploaderStrdiv =
                '<div class="cp_img_jia" id="' + pickerid + '"></div> ';
        } else {
            uploaderStrdiv =
                '<div class="cp_img_jia" id="' + pickerid + '"></div> </td></tr> <button id="ctlBtn" class="btn btn-default">开始上传</button> ';
        }
        divContainer.append(uploaderStrdiv);
        //初始化
        var $list = $('#fileList'),
            uploader,
            webuploaderoptions = $.extend({
                    auto: opts.auto,
                    disableGlobalDnd: true,
                    // swf文件路径
                    swf: '/webuploader/Uploader.swf',
                    // 文件接收服务端。
                    server: opts.server,
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#' + pickerid,
                    //只允许选择图片
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    //不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,
                    fileNumLimit: opts.fileNumLimit,
                    fileSizeLimit: opts.fileSizeLimit,
                    fileSingleSizeLimit: opts.fileSingleSizeLimit,
                    oneSucceed: options.oneSucceed || "",
                    allFinished: options.allFinished || ""
                },
                opts.innerOptions);

        uploader = WebUploader.create(webuploaderoptions);
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            var $li = $(
                    '<div id="' + file.id + '" class="cp_img">' +
                    '<img>' +
                    '<div class="cp_img_jian"></div></div>'
                ),
                $img = $li.find('img');

            // $list为容器jQuery实例
            $list.append($li);

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
            }

            $percent.css('width', percentage * 100 + '%');
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, response) {
            $('#' + file.id).addClass('upload-state-done');
            //将上传的url保存到数组
            photoUrlArray.push(new photoUrl(response.id, response.data));
            if (typeof webuploaderoptions.oneSucceed == "function") {
                webuploaderoptions.oneSucceed(file, response);
            }
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($li);
            }

            $error.text('上传失败');
        });

        // 上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });

        //所有文件上传完毕
        uploader.on("uploadFinished", function () {
            if (typeof webuploaderoptions.allFinished == "function") {
                webuploaderoptions.allFinished();
            }
        });

        //显示删除按钮
        $(".cp_img").on("mouseover", function () {
            $(this).find(".cp_img_jian").css('display', 'block');
        });
        //隐藏删除按钮
        $(".cp_img").on("mouseout", function () {
            $(this).find(".cp_img_jian").css('display', 'none');

        });
        //执行删除方法
        $list.on("click", ".cp_img_jian", function () {
            var Id = $(this).parent().attr("id");
            //删除该图片
            if (Id.indexOf("WU_FILE") == 0) {
                uploader.removeFile(uploader.getFile(Id, true));//如果是新上传文件则删除掉file
                for (var i = 0; i < photoUrlArray.length; i++) {
                    if (photoUrlArray[i].id == Id) {
                        photoUrlArray.remove(i);
                    }
                }
            }
            $(this).parent().remove();
        });
        //开始上传
        $("#ctlBtn").click(function () {
            uploader.upload();

        });
    }

    //创建上传控件
    $.fn.CreateWebUpload = function (options) {
        var ele = this;
        if (typeof WebUploader == 'undefined') {

            var css = ["/CSS/webuploader.css", "/CSS/style.css", "/CSS/demo.css", "/CSS/font-awesome.css"];
            for (var i = 0; i < css.length; i++) {
                $("<link>").attr({rel: "stylesheet", type: "text/css", href: applicationPath + css[i]}).appendTo("head");
            }
            var jspath = applicationPath + "/JS/webuploader.min.js";

            $.getScript(jspath).done(function () {
                initWebUpload(ele, options);
            })
                .fail(function () {
                    alert("请检查webuploader的路径是否正确!");
                });
        }
        else {
            initWebUpload(ele, options);
        }
    };
    //获取上传控件中所有图片的url
    $.fn.GetFilesAddress = function (options) {
        var photoUrls = "";
        $(".cp_img img").each(function () {
            if ($(this).attr("src").indexOf('Upload') >= 0) {
                photoUrls = photoUrls + $(this).attr("src") + ",";
            }
        });
        for (var i = 0; i < photoUrlArray.length; i++) {
            photoUrls = photoUrls + photoUrlArray[i].filePath + ",";
        }
        return photoUrls;
    };
    //加载已经存在的图片
    $.fn.LoadPics = function (urls) {
        var arr = urls.split(",");
        arr.forEach(function (e) {
            //生成html,并附加到$fileList
            if (e != "") {
                var strHtml =
                    '<div id="' + e + '" class="cp_img">' +
                    '<img src="' + e + '" /><div class="cp_img_jian"></div></div>';
                $("#fileList").append(strHtml);
            }
        });
    }
})(jQuery, window);

/*
 *删除数组指定下标或指定对象
 */
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
};

function f() {
    var score;
    console.log(score);
    score = "local";
    console.log(score);
}