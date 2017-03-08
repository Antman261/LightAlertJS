# LightAlertJS
A lightweight javascript notification library with customisable templates and layout in just 3kB.

## Installation

Install via npm
`npm install lightalertjs`

## Usage

Start by creating a service provider

```javascript
var lightalert = new require('lightalertjs').NotificationService({
  $elem: $("#notification-stack")
});
```

Then use service to create notifications

```javascript
lightalert.notify("Hello world!")
```

Add an image to the notification:

```javascript
lightalert.notify("Hello world!", "https://example.com/hello.svg")
```

Add a class, in this case changing background and text:

```javascript
lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-black")

lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-success")

lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-warning")

lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-error")

lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-info")

lightalert.notify("Hello world!", "https://example.com/hello.svg", "bg-primary")
```

Add a debounce timer to the service, preventing the user from receiving a notification more than once per x seconds. Makes use of [sessionStorage](https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage) to persist timer countdown across page loads.

```javascript
var lightalert = new NotificationService({
  $elem: $("#notification-stack"),
  debounce_seconds: 10
});
```

Change the template:

```javascript
var lightalert = new NotificationService({
  $elem: $("#notification-stack"),
  template: "<div class='notification {{class}} id='{{uid}}'><img src='{{imageUrl}}'>{{content}}</div>'"
});
```

Change whether new notifications are appended or prepended to the stack:

```javascript
var lightalert = new NotificationService({
  $elem: $("#notification-stack"),
  append: false
});
```

These settings can be changed after instantiation via properties:

```javascript
lightalert.debounce_seconds = 5;
```

## Requirements

* Bootstrap 3.3 (For default template, no CSS requirements if you provide your own)
* jQuery 1.8+
