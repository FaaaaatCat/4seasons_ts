import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";


export default function Layout() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("진짜 로그아웃 합니까?");
        if (ok) {
            await auth.signOut();
            navigate("/login")
        }
    }
    return (
        <>
            <ul className="home-menu">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/profile">
                    <li>Profile</li>
                </Link>
                <li onClick={onLogOut}>logout</li>
            </ul>
            <Outlet />
        </>
    )
}