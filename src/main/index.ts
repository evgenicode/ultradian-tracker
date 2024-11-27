import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import db from "./db";




function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

interface UserMark {
  id?: number;
  mark: number;
  timestamp: string;
  date: string;
}


ipcMain.handle("get-user-marks", async (): Promise<UserMark[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM user_marks", [], (err, rows) => {
      if (err) {
        console.error("Database Error:", err);
        reject(err);
      } else {
        resolve(rows as UserMark[]);
      }
    });
  });
});

ipcMain.handle("add-user-mark", async (event, userMark: Omit<UserMark, "id">): Promise<{id: number}> => {
  return new Promise((resolve, reject) => {
    const { mark, timestamp, date } = userMark;
    db.run(
      "INSERT INTO user_marks (mark, timestamp, date) VALUES (?, ?, ?)",
      [mark, timestamp, date],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID }); 
        }
      }
    )
  })
})

ipcMain.handle("delete-user-mark", async (event, id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM user_marks WHERE id = ?", [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

ipcMain.handle("update-user-mark", async (event, userMark: UserMark): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { id, mark, timestamp, date } = userMark;
    db.run(
      "UPDATE user_marks SET mark = ?, timestamp = ?, date = ? WHERE id = ?",
      [mark, timestamp, date, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
});