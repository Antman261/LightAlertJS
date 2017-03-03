# LightAlertJS
A lightweight notification javascript library with customisable templates and layout.

Start by creating a service provider

```
var notificationService = new NotificationService({
  $elem: $("#notification-stack")
});
```

Then use service to create notifications

```
notificationService.notify("Hello world!")
```

Add an image to the notification:

```
notificationService.notify("Hello world!", "https://example.com/hello.svg")
```

Add a class, in this case changing background and text:

```
notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-black")

notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-success")

notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-warning")

notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-error")

notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-info")

notificationService.notify("Hello world!", "https://example.com/hello.svg", "bg-primary")
```

Add a debounce timer to the service, preventing the user from receiving a notification more than once per x seconds:

```
var notificationService = new NotificationService({
  $elem: $("#notification-stack"),
  debounce_seconds: 10
});
```

Change the template:

```
var notificationService = new NotificationService({
  $elem: $("#notification-stack"),
  template: "<div class='notification {{class}} id='{{uid}}'><img src='{{imageUrl}}'>{{content}}</div>'"
});
```

Change whether new notifications are appended or prepended to the stack:

```
var notificationService = new NotificationService({
  $elem: $("#notification-stack"),
  append: false
});
```

These settings can be changed after instantiation via properties:

```
notificationService.debounce_seconds = 5;
```

## Requirements

* Bootstrap 3.3
* jQuery 1.8+
