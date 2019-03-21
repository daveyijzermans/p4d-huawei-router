'use strict'

try {
  var crypto = require('crypto')
} catch (err) {
  throw new Error('Crypto support is disabled!')
}
var axios = require('axios')
var defaults = require('./defaults')

/**
 * Create a new instance of Router
 *
 * @param {Object} instanceConfig The default config for the instance
*/
function Router(instanceConfig) {
	var c = Object.assign(defaults, instanceConfig);
	this.host = c.host
	this.username = c.username
	this.password = c.password
	this.timeout = parseInt(c.timeout) || 5000

	this.sesInfo = ''
	this.tokInfo = ''


	this.setHost = function (host) {
		this.host = host
	}
	this.setUsername = function (username) {
		this.username = username
	}
	this.setPassword = function (password) {
		this.password = password
	}
	this.setTimeout = function (timeout) {
		this.timeout = timeout
	}

	this.isSessionOpen = function () {
		return (this.tokInfo != '' || this.sesInfo != '')
	}

	this.openSession = function () {
		return new Promise((resolve, reject) => {
			axios(this.buildRequestOptions('GET', '/api/webserver/SesTokInfo')).then((body) => {
				let data = body.data
				this.tokInfo = data.match(/<TokInfo>(.*)<\/TokInfo>/)[1]
				this.sesInfo = data.match(/<SesInfo>(.*)<\/SesInfo>/)[1]

				axios(this.buildRequestOptions('POST', '/api/user/login')).then((body) => {
					resolve()
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getStatus = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/monitoring/status')).then((body) => {
					// console.log(body.data)
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getTrafficStats = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/monitoring/traffic-statistics')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getMonthStats = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/monitoring/month_statistics')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getNetwork = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/net/current-plmn')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getSmsCount = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/sms/sms-count')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getWlanClients = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/wlan/host-list')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.getNotifications = function () {
		return new Promise((resolve, reject) => {
			this.openSession().then(() => {
				axios(this.buildRequestOptions('GET', '/api/monitoring/check-notifications')).then((body) => {
					let jsonData = this.parseXmlToJson(body.data)
					resolve(jsonData)
				}).catch(reject);
			}).catch(reject);
		})
	}

	this.hashedString = function (string) {
		var sha256 = crypto.createHash('sha256')
		sha256.update(string)
		return sha256.digest('hex')
	}

	this.buildXmlBody = function () {
		return '<?xml version:"1.0" encoding="UTF-8"?><request><Username>'+this.username+'</Username><Password>'+Buffer.from(this.hashedString(this.username+Buffer.from(this.hashedString(this.password)).toString('base64')+this.tokInfo)).toString('base64')+'</Password><password_type>4</password_type></request>'
	}

	this.buildRequestOptions = function (method, path) {
		let opt = {
			method: method,
			keepAlive: false,
			url: 'http://'+this.host+path,
			timeout: this.timeout,
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8;charset=UTF-8',
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'da-DK,da;q=0.8,en-US;q=0.6,en;q=0.4',
				'Accept-Charset': 'utf-8;q=0.7,*;q=0.7',
				'Connection': 'keep-alive',
				'Keep-Alive': '115',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Cookie': this.sesInfo,
				// 'Host': this.host,
				// 'Origin': 'http://'+this.host,
				// 'Referer': 'http://'+this.host+'/html/home.html',
				'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
				'X-Requested-With': 'XMLHttpRequest'
			},
		}
		if (method == 'GET') {
			opt['__RequestVerificationToken'] = this.tokInfo
		}

		if (method == 'POST') {
			opt['body'] = this.buildXmlBody()
			opt['gzip'] = false
		}
		return opt
	}

	this.parseXmlToJson = function (xml) {
		let fields = {} 
		xml.match(/<.*>(.+)<\/.*>/g).forEach((fieldString) => {
			let fieldInfo = fieldString.match(/<(.*)>(.*)<\/.*>/)
			fields[fieldInfo[1]] = (isNaN(parseInt(fieldInfo[2]))) ? fieldInfo[2] : parseInt(fieldInfo[2])
		})
		return fields
	}
}

module.exports = Router
