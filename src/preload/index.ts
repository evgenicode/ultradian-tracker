import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { addUserMark, updateUserMark } from "./ipcService"

// Custom APIs for renderer
const api = {

  addUserMark: async (mark: number, timestamp: string, date: string) => {
    try {
        console.log("hello from preload")
        return await ipcRenderer.invoke("add-user-mark", { mark, timestamp, date });
    } catch (error) {
        console.error("Error adding user mark:", error);
        throw error; // Ensure errors propagate
    }
},

  getUserMarks: async () => {
    try {
        return await ipcRenderer.invoke("get-user-marks");
    } catch (error) {
      console.error("Error fetchin user marks:", error)
      throw error;
    }
  },


  deleteUserMark: async (id: number) => {
    try {
      return await ipcRenderer.invoke("delete-user-mark", id);
    } catch (error) {
      console.error("Error deleting user mark:", error)
      throw error;
    }
  },

  updateUserMark: async (id:number, mark: number, timestamp: string, date: string) => {
    try {
      await ipcRenderer.invoke("update-user-mark", { id, mark, timestamp, date });
    } catch (error) {
      console.error("Error updating user mark:", error);
    }
  },

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
