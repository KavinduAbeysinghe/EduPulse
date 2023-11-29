import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./views/MainLayout";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <NotificationContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </BrowserRouter>
    </NotificationContextProvider>
  );
}

export default App;
