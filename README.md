# Router

NodeJS connector to Huawei Mobile Router (E5377Bs-508) API

## Features

- Extract statistics

## Installing

Using npm:

```bash
$ npm install @p4d/huawei-router
```


## Example

Included `example.js` file with usage demo.

* Require the object

```js
var router = require('@p4d/huawei-router')
```

* Set the `username`, `password` and `host` (`admin`/`admin` / `192.168.8.1` by default)

```js
router.setUsername('adminUser')
router.setPassword('adminPassword')
router.setHost('192.168.9.1')
```

* All data extraction methods are based on `Promise`s:

```js
router.getStatus().then((data) => {
	console.log("MODEM STATUS")
	console.log(data)
})

router.getTrafficStats().then((data) => {
	console.log("TRAFFIC STATS")
	console.log(data)
})

router.getMonthStats().then((data) => {
	console.log("MONTH STATS")
	console.log(data)
})

router.getNetwork().then((data) => {
	console.log("NETWORK DATA")
	console.log(data)
})

router.getSmsCount().then((data) => {
	console.log("SMS COUNT")
	console.log(data)
})

router.getWlanClients().then((data) => {
	console.log("WLAN CLIENTS")
	console.log(data)
})

router.getNotifications().then((data) => {
	console.log("NOTIFICATIONS")
	console.log(data)
})
```
