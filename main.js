const { app, BrowserWindow, contextBridge,ipcMain } = require('electron');
const path = require('node:path');
 
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			sandbox:false,
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			worldSafeExecuteJavaScript: true,
		},
	});

	mainWindow.loadFile('index.html');

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (mainWindow === null) createWindow();
	});
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
 
 

// 0x18cb62a0983734641012365cdc2c3fe3af67fd512871dd3c581826f14cc08a33
// erosion deposit one verb group climb narrow swear trouble flame insane narrow