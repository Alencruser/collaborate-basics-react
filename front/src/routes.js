import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreateCategory from "./Category/CreateCategory";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="create-category" element={<CreateCategory/>}></Route>
        </Route>
    )
)