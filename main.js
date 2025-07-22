const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            partition: 'persist:webview' // This enables session persistence
        }
    });

    // Load the url
    mainWindow.loadURL('https://humane-mistakenly-shepherd.ngrok-free.app/');
    // use this link https://humane-mistakenly-shepherd.ngrok-free.app/ or if you are in a local network via ZeroTier, use 192.168.191.244:3000

    // Open the DevTools if needed (comment out in production)
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
