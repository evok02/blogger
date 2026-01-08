//import { useState, userEffect } from "react"
import "./App.css";
import {Title} from "./components/Title";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

function App() {
    const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Route>
        ));

    return (<RouterProvider router={router}/>);
  
}

export default App
