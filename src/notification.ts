declare var $;

export class Notification {
  private timer: any;
  public complete: boolean;
  public fired: boolean;
  public uid: number;
  private $elem: any;

  constructor (public content: string,
               public imageUrl: string,
               public _class: string) {
    this.complete = false;
    this.fired = false;
    this.uid = Math.floor(Math.random() * (100000 - 1)) + 1;
  }

  public fire(template) {
    this.timer = setTimeout(function (self) {
      self.delete()
    }, 8500, this);
    this.fired = true;
    return this.render(template);
  }

  private render(template) {
    let html = template.replace('{{class}}', this._class)
                       .replace('{{uid}}', this.uid)
                       .replace('{{imageUrl}}', this.imageUrl)
                       .replace('{{content}}', this.content)
    return this.$elem = $(html);
  }

  private delete() {
    this.complete = true;
    let _this = this;
    this.$elem.fadeOut(300, function () {
      _this.$elem.remove();
    });
  }
}
