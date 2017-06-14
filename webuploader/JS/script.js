/*for (var i = 0; i < 5; i++) {
 document.write(i);
 }

 document.write("<br>");

 for (i = 0; i < 5; i++) {
 document.write(i);
 }

 document.write("<br>");

 setTimeout(function () {
 document.write("1");
 }, 0);
 new Promise(function executor(resolve) {
 document.write("2");
 for (var i = 0; i < 10000; i++) {
 i == 9999 && resolve();
 }
 document.write("3");
 }).then(function () {
 document.write("4");
 });
 document.write("5");*/

var postData = {}, urls = [], names = [];
$("#AttachmentUrl").CreateWebUpload({
    auto: true,
    fileSingleSizeLimit: 200 * 1024,//限制200K
    server: '/webuploader/img', //图片服务器地址
    oneSucceed: function (file, response) {//上传成功的回调函数
        urls.push(response.data);
        names.push(file.name);
    },
    allFinished: function () {
        postData["PicUrl"] = urls.join(",");
        postData["PicName"] = names.join(",");
    }
});