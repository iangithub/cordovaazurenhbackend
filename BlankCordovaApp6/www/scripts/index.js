// 如需空白範本的簡介，請參閱下列文件: 
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要針對在 Ripple 或 Android 裝置/模擬器上載入的頁面，偵錯程式碼: 請啟動您的應用程式，設定中斷點，
// 然後在 JavaScript 主控台中執行 "window.location.reload()"。
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // 處理 Cordova 暫停與繼續事件
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var azureClient = new WindowsAzure.MobileServiceClient('http://ianmobileapp2.azurewebsites.net');

        //PushNotification.
        var push = PushNotification.init({
            android: {
                senderID: "your google project code"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true",
            },
            windows: {}
        });

        /*
        原本使用WindowsAzure.MobileServiceClient來實作註冊Azure NH
        但MobileService.Cordova.js / executeRequest方法中的'push/installations/'
        uri 似乎是錯誤，目前皆會回傳404導致無法進行Azure NH註冊
        */
        //push.on('registration', function (data) {
        //    console.log('PNS data'+data.registrationId);
        //    azureClient.push.register('gcm', data.registrationId);
        //});


        push.on('registration', function (data) {
            //取得pns值，各平台的pns值不同
            var pnsid = data.registrationId;

            /*
                自建mobile app backend，開放API來做註冊Azure HN的動作
                取代MobileService plugin 回應 404 的問題
            */
            $.post("http://your-mobile-abb-backend.azurewebsites.net/api/register/post",
                function (data, status) {
                    //取得 Azure HN 註冊ID值
                    console.log(data + ";" + status);

                    $.ajax({
                        type: 'put',
                        url: 'http://ianmobileapp2.azurewebsites.net/api/register/Put/?id=' + data,
                        data: {
                            platform: 'gcm',
                            Handle: pnsid,
                            Tags: ''
                        }
                    })
                });
        });

        push.on('notification', function (data, d2) {
            alert('Push Received: ' + data.message);
        });


        push.on('error', function (e) {
            console.log('push.on Error:' + e.message);
        })

    };

    function onPause() {
        // TODO: 這個應用程式已暫停。請在這裡儲存應用程式狀態。
    };

    function onResume() {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
    };

})();