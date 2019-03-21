var Router = require('./core/Router');
var router = new Router(); // initialize with defaults

router.setUsername('admin')
router.setPassword('admin_2017_p4d')

router.getStatus().then((data) => {
	console.log("MODEM STATUS")
	console.log(data)
}).catch((err) =>
{
	console.log("Modem status failed :(");
});

router.getTrafficStats().then((data) => {
	console.log("TRAFFIC STATS")
	console.log(data)
}).catch((err) =>
{
	console.log("Traffic status failed :(");
});

router.getMonthStats().then((data) => {
	console.log("MONTH STATS")
	console.log(data)
}).catch((err) =>
{
	console.log("Monthly status failed :(");
});

router.getNetwork().then((data) => {
	console.log("NETWORK DATA")
	console.log(data)
}).catch((err) =>
{
	console.log("Network info failed :(");
});

router.getSmsCount().then((data) => {
	console.log("SMS COUNT")
	console.log(data)
}).catch((err) =>
{
	console.log("SMS count failed :(");
});

router.getWlanClients().then((data) => {
	console.log("WLAN CLIENTS")
	console.log(data)
}).catch((err) =>
{
	console.log("WLAN clients failed :(");
});

router.getNotifications().then((data) => {
	console.log("NOTIFICATIONS")
	console.log(data)
}).catch((err) =>
{
	console.log("Retrieve notifications failed :(");
});