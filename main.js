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
    (async () => {
        const urls = [
            "http://192.168.191.244:3000/",
            "https://netturm.ru.tuna.am/",
            "http://192.168.1.21:3000/",
        ];

        for (const url of urls) {
            const isOnline = await pingServer(url);
            if (isOnline) {
                console.log(`${url} available, you are connected to the server`);
                mainWindow.loadURL(url);
                break;
            } else {
                console.log(`${url} unavailable, you are offline or the server is down`);
                mainWindow.loadURL(url);
                continue;
            }
        }
    })();    
    
    // use this link https://humane-mistakenly-shepherd.ngrok-free.app/ or if you are in a local network via ZeroTier, use 192.168.191.244:3000

    // Open the DevTools if needed (comment out in production)
    // mainWindow.webContents.openDevTools();
}

async function pingServer(url, timeout = 5000) {
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
        });

        clearTimeout(id);
        return response.ok; // Возвращает true, если статус ответа 2xx
    } catch (error) {
        // Обработка ошибок (например, таймаут, CORS)
        return false;
    }
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
