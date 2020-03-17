const overlays = require('./js/overlays.js')

const lor = {
	regionsWindow: null,

	async getCardPositions() {
		const json = await fetch('http://127.0.0.1:21337/positional-rectangles')
			.then(res => res.json())
		overlays.setScale(json.Screen)
		console.log(json)
		return json
	},

	async updateRegions(regions) {
		const el = await this.regionsWindow.webContents.executeJavaScript(
			`window.showRegions("${regions.join(',')}")`
		)
	}
}

async function getPos() {
	const data = await lor.getCardPositions();
	overlays.createRects(data.Rectangles)
	// updateLoop()
}

async function updateLoop() {
	const data = await lor.getCardPositions();
	overlays.updatePos(data.Rectangles)
	setTimeout(updateLoop, 1000)
}

async function makeCounterWindow() {
	overlays.closeAll()
	const data = await lor.getCardPositions();
	const win = overlays.createWindow(0.17 * data.Screen.ScreenWidth, data.Screen.ScreenHeight * 0.65, 400, 600, 'html/region-window.html')
	// win.webContents.openDevTools()
	lor.regionsWindow = win
}

function closeAll() {
	overlays.closeAll()
}

module.exports = lor;
