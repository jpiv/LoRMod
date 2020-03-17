const { ipcMain } = require('electron')
const threatsJson = require('../data/threats.json')

const cardData = {
	getData(regions) {
		console.log(threatsJson)
		return regions.map(region => ({
			region,
			threats: threatsJson[region]
		}))
	}
}

ipcMain.on('get-data', (evt, regions) => {
	evt.returnValue = cardData.getData(regions)
})

module.exports = cardData
