import {Outlet} from "react-router-dom";
import  NavB  from "../Navbar/Navbar"

function Home() {
    return (
        <div>
            <NavB />
            <Outlet/>
        </div>
    )
}

export default Home;