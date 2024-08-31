import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import CreateCategory from "./Category/CreateCategory";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="create-category" element={<CreateCategory/>}></Route>
        </Route>
    )
)