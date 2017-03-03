import {Notification} from './notification';

interface options {
  $elem: any;
  debounce_seconds?: number;
  template?: string;
  append?: boolean;
}

export class NotificationService {
  private notifications: Array<Notification>;
  private countDown = 0;
  private $elem;
  private debounce_seconds = 0;
  private template = '<div class="notification {{class}}" id="{{uid}}" style="display:none"><div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="{{imageUrl}}" alt=""></a></div><div class="media-body media-middle">{{content}}</div></div>'
  private append: true;

  constructor(options: options) {
    this.notifications = [];
    this.countDown = this.getCountdownFromSession();
    for (let key in options) {
      this[key] = options[key];
    }
    setInterval(function (self) {
      self.checkQueue();
      self.deductCounter();
      self.saveCountdownInSession();
    }, 1000, this);
  }

  public notify(content: string, image_url: string, _class: string) {
    if (this.checkForDuplicates(content) || this.countDown > 0) {
      return false
    }
    let notif = new Notification(content, image_url, _class);
    this.notifications.push(notif);
    this.countDown = this.debounce_seconds;
  }

  private checkQueue() {
    let hasFiredOne = false;
    for (let i = this.notifications.length-1;i>=0; i--) {
      let notif = this.notifications[i];
      if (notif !== undefined && notif.fired == false && hasFiredOne == false) {
        let $notifElem = notif.fire(this.template);
        if (this.append) {
          this.$elem.append($notifElem);
        } else {
          this.$elem.prepend($notifElem)
        }
        $notifElem.fadeIn(300);
        hasFiredOne = true;
        continue;
      }
      if (notif.complete) {
        this.notifications.splice(i, 1);
      }
    }
  }

  private checkForDuplicates(str) {
    for (let i = this.notifications.length-1; i>=0; i--) {
      if (this.notifications[i].content == str) {
        return true;
      }
    }
    return false;
  }

  private deductCounter() {
    if (this.countDown > 0) {
      this.countDown -= 1;
    }
  }

  private getCountdownFromSession() {
    try {
      var data = sessionStorage.getItem('notificationService');
      if (typeof data !== 'undefined' && data !== null && data.length > 0) {
        return parseInt(data);
      }
    }
    catch (e) {
      this.handleSessionError(e)
    }
    return 0;
  }

  private saveCountdownInSession() {
    try {
      sessionStorage.setItem('notificationService', this.countDown.toString())
    }
    catch (e) {
      this.handleSessionError(e)
    }
  }

  private handleSessionError(e) {
    console.log(e);
    console.error('Private browsing or disabling cookies will prevent us from saving your choices. For a better experience, please exit private browsing and enable cookies.');
  }
}
