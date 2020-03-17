const { BrowserWindow, getCurrentWindow, screen } = require('electron').remote

const overlays = {
	_currentWindows: [],
	screenWidth: 0,
	screenHeight: 0,
	electronDisplaySize: screen.getAllDisplays()[0].bounds,
	buffer: 23,

	closeAll() {
		this._currentWindows.forEach(win => win.close())
		this._currentWindows = []
	},


	setScale({ ScreenWidth: screenWidth, ScreenHeight: screenHeight }) {
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight
	},

	scale(val) {
		return Math.floor(this.electronDisplaySize.width / this.screenWidth * val)
	},

	createWindow(x, y, width, height, filePath) {
		const win = new BrowserWindow({
			width: this.scale(width) + this.buffer * 2,
			height: this.scale(height) + this.buffer * 2,
			alwaysOnTop: true,
			frame: false,
			skipTaskbar: false,
			transparent: true,
			webPreferences: {
				nodeIntegration: true,
			}
		})
		console.log(x, y, width, height, filePath)
		win.setPosition(this.scale(x) - this.buffer, this.electronDisplaySize.height - (this.scale(y) + this.buffer) )
		win.loadFile(filePath)
		this._currentWindows.push(win)

	  	setTimeout(() => {
		    // win.setFocusable(false)
		    // win.setAlwaysOnTop(true)
		}, 300)
		return win
	},

	createRects(lorRects) {
		this._currentWindows = lorRects.map(({
			Width: width,
			Height: height,
			TopLeftX: topLeftX,
			TopLeftY: topLeftY,
			CardCode: code
		}) => {
			const win = this.createWindow(topLeftX, topLeftY, width, height, 'html/card.html')
			return win
		})
	},

	updatePos(lorRects) {
		lorRects.forEach(({
			Width: width,
			Height: height,
			TopLeftX: topLeftX,
			TopLeftY: topLeftY,
			CardCode: code
		}, i) => {
			const win = this._currentWindows[i]
			win.setSize(
				this.scale(width) + this.buffer * 2,
				this.scale(height) + this.buffer * 2,
			)
			win.setPosition(this.scale(topLeftX) - this.buffer, this.electronDisplaySize.height - (this.scale(topLeftY) + this.buffer) )
		})
	}
}

module.exports = overlays
