import { LocalTime } from './components/LocalTime'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>Hello Electron</div>
      <LocalTime />
    </>
  )
}

export default App
