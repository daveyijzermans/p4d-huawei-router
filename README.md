# Router

NodeJS connector to Huawei Mobile Router (E5377Bs-508) API. Mofified from npm package version found at https://www.npmjs.com/package/@p4d/huawei-router.

## Features

- Extract statistics

## Installing

Using npm:

```bash
$ npm install github:daveyijzermans/p4d-huawei-router
```


## Example

Included `example.js` file with usage demo.

* Require the object

```js
var Router = require('p4d-huawei-router')
var router = new Router()
```

* Set the `username`, `password` and `host` (`admin`/`admin` / `192.168.8.1` by default)

```js
router.setUsername('adminUser')
router.setPassword('adminPassword')
router.setHost('192.168.9.1')
router.setTimeout(3000)
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

Remember to catch rejections as you wish! This version was adapted to also fire rejections after a set timeout.
