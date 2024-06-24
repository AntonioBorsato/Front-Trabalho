//importação arquivos do projeto
import Form from "./pages/Form";
import "./App.css";
//importação Npm Install
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Characters from "./pages/Characters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />
  },
  {
    path: "/Characters",
    element: <Characters />
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />,
      <ToastContainer />
    </>
  );
}

export default App;
