//import { useState, userEffect } from "react"
import "./App.css";
import {Navbar} from "./components/Navbar";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {TestFetch} from "./pages/TestPage";
import {ArticlesPage} from "./pages/ArticlesPage";
import {ArticlePage} from "./pages/ArticlePage";
import {InvalidPage} from "./pages/InvalidPage";
import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import {useState} from "react";

function App() {
    let [isIn, setIsIn] = useState(false)

    const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<MainLayout loggedIn={isIn} setIsIn={setIsIn}/>}>
                <Route index isIn={isIn} element={<HomePage/>}/>
                <Route path="/login"  element={<LoginPage setIsIn={setIsIn}/>}/>
                <Route path="/test" element={<TestFetch/>}/>
                <Route path="/articles" isIn={isIn} element={<ArticlesPage/>}/>
                <Route path="/articles/:id" element={<ArticlePage/>}/>
                <Route path="*" element={<InvalidPage/>}/>
            </Route>
        ));

    return (<RouterProvider router={router}/>);
  
}

export default App
