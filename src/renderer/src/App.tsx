import { LocalTime } from './components/LocalTime'
import { SelfAssesment } from './components/SelfAssessment'
import { UserMarks } from "./components/UserMarks"

console.log("Electron API:", window.electron);
console.log("Custom API:", window.api);

// const newMark = { 
//   mark: 5, 
//   timestamp: new Date().toISOString(), 
//   date: new Date().toLocaleDateString() 
// };



// (window as any).api.invoke("add-user-mark", {
//   mark: newMark.mark,
//   timestamp: newMark.timestamp,
//   date: newMark.date,
// });

// console.log('window.api:', (window as any).api);

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>Hello Electron</div>
      <LocalTime />
      <SelfAssesment />
      <UserMarks />
    </>
  )
}

export default App
