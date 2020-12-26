import Main from './screens/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Route path='/' component={Main} />
    </Router>
  )
}

export default App
