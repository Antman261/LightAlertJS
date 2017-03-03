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
