import "./App.css"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify"
import Routes from "./Routes"
import { AuthProvider } from "./components/AuthContext"

function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Routes />
        </div>
      </AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
