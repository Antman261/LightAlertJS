"use strict";
var notification_1 = require("./notification");
var NotificationService = (function () {
    function NotificationService(options) {
        this.countDown = 0;
        this.debounce_seconds = 0;
        this.template = '<div class="notification {{class}}" id="{{uid}}" style="display:none"><div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="{{imageUrl}}" alt=""></a></div><div class="media-body media-middle">{{content}}</div></div>';
        this.notifications = [];
        this.countDown = this.getCountdownFromSession();
        for (var key in options) {
            this[key] = options[key];
        }
        setInterval(function (self) {
            self.checkQueue();
            self.deductCounter();
            self.saveCountdownInSession();
        }, 1000, this);
    }
    NotificationService.prototype.notify = function (content, image_url, _class) {
        if (this.checkForDuplicates(content) || this.countDown > 0) {
            return false;
        }
        var notif = new notification_1.Notification(content, image_url, _class);
        this.notifications.push(notif);
        this.countDown = this.debounce_seconds;
    };
    NotificationService.prototype.checkQueue = function () {
        var hasFiredOne = false;
        for (var i = this.notifications.length - 1; i >= 0; i--) {
            var notif = this.notifications[i];
            if (notif !== undefined && notif.fired == false && hasFiredOne == false) {
                var $notifElem = notif.fire(this.template);
                if (this.append) {
                    this.$elem.append($notifElem);
                }
                else {
                    this.$elem.prepend($notifElem);
                }
                $notifElem.fadeIn(300);
                hasFiredOne = true;
                continue;
            }
            if (notif.complete) {
                this.notifications.splice(i, 1);
            }
        }
    };
    NotificationService.prototype.checkForDuplicates = function (str) {
        for (var i = this.notifications.length - 1; i >= 0; i--) {
            if (this.notifications[i].content == str) {
                return true;
            }
        }
        return false;
    };
    NotificationService.prototype.deductCounter = function () {
        if (this.countDown > 0) {
            this.countDown -= 1;
        }
    };
    NotificationService.prototype.getCountdownFromSession = function () {
        try {
            var data = sessionStorage.getItem('notificationService');
            if (typeof data !== 'undefined' && data !== null && data.length > 0) {
                return parseInt(data);
            }
        }
        catch (e) {
            this.handleSessionError(e);
        }
        return 0;
    };
    NotificationService.prototype.saveCountdownInSession = function () {
        try {
            sessionStorage.setItem('notificationService', this.countDown.toString());
        }
        catch (e) {
            this.handleSessionError(e);
        }
    };
    NotificationService.prototype.handleSessionError = function (e) {
        console.log(e);
        console.error('Private browsing or disabling cookies will prevent us from saving your choices. For a better experience, please exit private browsing and enable cookies.');
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
