import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      <Route index element={<Home />} />

      <Route path="/demo" element={<Demo />} />

      <Route path="/demo/:id" element={<Demo />} />

    </Route>
  )
);