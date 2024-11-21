import { LocalTime } from './components/LocalTime'
import { SelfAssesment } from './components/SelfAssessment'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>Hello Electron</div>
      <LocalTime />
      <SelfAssesment />
    </>
  )
}

export default App
