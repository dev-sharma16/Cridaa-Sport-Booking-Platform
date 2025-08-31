import './App.css'
import { useAuthCheck } from "./customHook/AuthCheck" 
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar';

function App() {
  useAuthCheck();

  return(
    <div>
      <NavBar/>
      <AppRoutes/>
    </div>
  )
}

export default App