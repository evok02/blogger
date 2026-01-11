//import { useState, userEffect } from "react"
import "./App.css";
import {Navbar} from "./components/Navbar";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {TestFetch} from "./pages/TestPage";
import {ArticlesPage} from "./pages/ArticlesPage";
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
                <Route path="/test" element={<TestFetch/>}/>
                <Route path="/articles" element={<ArticlesPage/>}/>
            </Route>
        ));

    return (<RouterProvider router={router}/>);
  
}

export default App
