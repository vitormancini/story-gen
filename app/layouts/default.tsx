import { NavLink, Outlet } from "react-router";

export default function () {
    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/breweries">Breweries</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}