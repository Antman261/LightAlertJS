(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Notification = (function () {
    function Notification(content, imageUrl, _class) {
        this.content = content;
        this.imageUrl = imageUrl;
        this._class = _class;
        this.complete = false;
        this.fired = false;
        this.uid = Math.floor(Math.random() * (100000 - 1)) + 1;
    }
    Notification.prototype.fire = function (template) {
        this.timer = setTimeout(function (self) {
            self.delete();
        }, 8500, this);
        this.fired = true;
        return this.render(template);
    };
    Notification.prototype.render = function (template) {
        var html = template.replace('{{class}}', this._class)
            .replace('{{uid}}', this.uid)
            .replace('{{imageUrl}}', this.imageUrl)
            .replace('{{content}}', this.content);
        return this.$elem = $(html);
    };
    Notification.prototype.delete = function () {
        this.complete = true;
        var _this = this;
        this.$elem.fadeOut(300, function () {
            _this.$elem.remove();
        });
    };
    return Notification;
}());
exports.Notification = Notification;

},{}],2:[function(require,module,exports){
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
            if (notif !== undefined && notif.fired === false && hasFiredOne === false) {
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

},{"./notification":1}]},{},[2]);
