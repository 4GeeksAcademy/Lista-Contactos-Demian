import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import CreateNewContact from "./components/CreateNewContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found! 404 Error</h1>}>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateNewContact />} />
      <Route path="/edit-contact/:id" element={<CreateNewContact />} />
    </Route>
  )
);