import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginRegistrationScreen from "./Pages/LoginRegistrationScreen";
import Dashboard from "./Pages/DashboardScreen";
import AppContextProvider from "./context/userContext";
import ShareTask from "./Pages/sharepage/sharepage";


function App() {
  return(
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistrationScreen screen={'Login'}/>}/>
          <Route path="/register" element={<LoginRegistrationScreen screen={'Register'}/>}/>
          <Route path="/login" element={<LoginRegistrationScreen screen={'Login'}/>}/>
          <Route path="/board" element={<Dashboard screen={"board"}/>}/>
          <Route path="/analytics" element={<Dashboard screen={"analytics"}/>}/>
          <Route path="/settings" element={<Dashboard screen={'settings'}/>}/>
          <Route path="/shareTask/:id" element={<ShareTask/>}/>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>

  )
}

export default App
