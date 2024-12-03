// import { ipcRenderer } from "electron";


// export const getUserMarks = async () => {
//   try {
//     return await ipcRenderer.invoke("get-user-marks");
//   } catch (error) {
//     console.error("Error fetching user marks:", error);
//     return [];
//   }
// };

// export const addUserMark = async (mark: number, timestamp: string, date: string) => {
//   try {
//     return await ipcRenderer.invoke("add-user-mark", { mark, timestamp, date });
//   } catch (error) {
//     console.error("Error adding user mark:", error);
//   }
// };

// export const updateUserMark = async (id: number, mark: number, timestamp: string, date: string) => {
//   try {
//     await ipcRenderer.invoke("update-user-mark", { id, mark, timestamp, date });
//   } catch(error) {
//     console.error("Error updating user mark:", error);
//   }
// };

// export const deleteUserMark = async (id: number) => {
//   try {
//     await ipcRenderer.invoke("delete-user-mark", id);
//   } catch(error) {
//     console.error("Error deleting user mark:", error)
//   }
// }