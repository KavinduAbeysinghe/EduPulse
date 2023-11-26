import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./views/MainLayout";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContextProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <NotificationContextProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </NotificationContextProvider>
  );
}

export default App;
