import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreateCategory from "./Pages/Category/CreateCategory";
import SignIn from "./Pages/SignIn/SignIn";

export const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<Home/>}>
                <Route path="create-category" element={<CreateCategory/>}></Route>
                <Route path="signin" element={<SignIn />}></Route>
            </Route>
    )
)