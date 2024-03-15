import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { LoginUser } from "./components/LoginUser";
import { RegisterUser } from "./components/RegisterUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Main Page</p>,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
