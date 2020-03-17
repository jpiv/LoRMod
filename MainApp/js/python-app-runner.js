const { spawn } = require('child_process')

window.startPythonApp = startApp;


function startApp() {
	console.log('starting app...')
	// const app = spawn('python', ['-u', '../RegionFinder/FindRegions.py'])
	const app = spawn('./dist/FindRegions/FindRegions.exe')
	app.stdout.on('data', data => {
		dataStr = data.toString()
		console.log('Python app:', dataStr)
		const regionIndex = dataStr.indexOf('[')
		if (regionIndex > -1) {
			const closingIndex = dataStr.indexOf(']')
			const jsonStr = dataStr.substring(regionIndex, closingIndex + 1)
			const json = JSON.parse(jsonStr)
			console.log(json)
			lor.updateRegions(json)	
		}
	})
}
