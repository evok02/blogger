//import { useState, userEffect } from "react"
import "./App.css";
import {Navbar} from "./components/Navbar";
//import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {TestPage} from "./pages/TestPage";
import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

function App() {
    const router = createBrowserRouter(
    createRoutesFromElements(
            <>
                <Route index element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/test" element={<TestPage/>}/>
            </>
        ));

    return (<RouterProvider router={router}/>);
  
}

export default App
