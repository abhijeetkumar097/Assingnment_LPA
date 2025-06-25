import FeedbackForm from './FeedbackForm'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<FeedbackForm />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
