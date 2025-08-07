const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            partition: 'persist:webview' // This enables session persistence
        }
    });

    // Предотвращаем закрытие окна, вместо этого скрываем его
    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
    });

    // Load the url
    (async () => {
        const urls = [
            "https://netturm.ru.tuna.am/",
            "http://192.168.191.244:3000/",
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

    // Open the DevTools if needed (comment out in production)
    // mainWindow.webContents.openDevTools();
}

function createTray() {
    // Создаем иконку для трея (можно использовать ту же иконку или отдельную)
    const trayIcon = path.join(__dirname, 'icon.png'); // или создайте отдельную иконку для трея
    tray = new Tray(trayIcon);

    // Создаем контекстное меню для трея
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Показать приложение',
            click: () => {
                mainWindow.show();
                mainWindow.focus();
            }
        },
        {
            label: 'Скрыть приложение',
            click: () => {
                mainWindow.hide();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Выход',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    // Устанавливаем контекстное меню и подсказку
    tray.setContextMenu(contextMenu);
    tray.setToolTip('NetTurm');

    // Обработчик двойного клика по иконке в трее
    tray.on('double-click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
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
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Обработчик события перед выходом из приложения
app.on('before-quit', () => {
    app.isQuiting = true;
});