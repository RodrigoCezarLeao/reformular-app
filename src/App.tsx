import './App.css'
import { ObserverProvider } from './hooks/hub'
import { LangSwitch } from './components/langSwitch'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { WorkerPage } from './pages/Worker'
import { Schedule } from './pages/Schedule'
import { Construction } from './pages/Construction'

function App() {
  return (
    <ObserverProvider>
      <LangSwitch />

      <Router>
        <div>
          <NavBar />
          <div>
            <Routes>
              <Route path="/worker" element={<WorkerPage />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>

          </div>
        </div>
      </Router>
      
    </ObserverProvider>
  )
}

export default App
