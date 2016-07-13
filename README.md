# cordovaazurenhbackend
無法使用mobile service plugin結合azure PushNotification 的替代方案


Cordova App 要使用 Azure Notification Hubs服務，正常來說可以用透過 "cordova-plugin-ms-azure-mobile-apps"  + "phonegap-plugin-push" 這二個plugin來達成，詳細可以參考我放在github的範例(https://github.com/iangithub/Cordova-Azure-Notification-Hubs)，但這幾天一位朋友告知好像無法正常運作，會有404錯誤，本篇提供另一個替代方案，讓Cordova App可以正常使用Azure Notification Hubs服務
