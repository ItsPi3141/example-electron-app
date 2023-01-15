const { BrowserWindow, app, screen } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();

app.on("ready", () => {
	let x_pos = Math.random(0, screen.getPrimaryDisplay().size.width) * 1000;
	let y_pos = Math.random(0, screen.getPrimaryDisplay().size.height) * 1000;
	console.log(x_pos);
	console.log(y_pos);
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		x: x_pos,
		y: y_pos,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		},
		titleBarStyle: "hidden"
	});
	require("@electron/remote/main").enable(mainWindow.webContents);

	mainWindow.loadFile("index.html");

	// mainWindow.webContents.openDevTools()

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
