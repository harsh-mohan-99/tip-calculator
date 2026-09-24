
import Tipcalc from './tipcalc'
import logo from '../images/logo.svg'
import './App.css'

function App() {

  return (
    <>
      <div className="img">
        <img src={logo} alt="SPLITTER" name='logo' />
      </div>
      <div className="container">
        <Tipcalc />
      </div>
    </>
  )
}

export default App
