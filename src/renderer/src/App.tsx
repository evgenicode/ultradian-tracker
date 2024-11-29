import { LocalTime } from './components/LocalTime'
import { SelfAssesment } from './components/SelfAssessment'

console.log("Electron API:", window.electron);
console.log("Custom API:", window.api);

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>Hello Electron</div>
      <LocalTime />
      {/* <SelfAssesment /> */}
    </>
  )
}

export default App
