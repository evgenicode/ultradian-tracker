import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  addUserMark: (mark: number, timestamp: string, date: string) =>
    ipcRenderer.invoke("add-user-mark", { mark, timestamp, date }),

  getUserMarks: () => ipcRenderer.invoke("get-user-marks"),

  deleteUserMark: (id: number) => ipcRenderer.invoke("delete-user-mark", id),

  updateUserMark: (userMark: { id: number; mark: number; timestamp: string; date: string }) =>
    ipcRenderer.invoke("update-user-mark", userMark),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
