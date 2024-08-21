import { Outlet } from "react-router-dom";
import Header from "./header";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

interface LayoutProps {
    title: string;
    home?: boolean;
}

export default function Layout({ title, home }: LayoutProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const user = auth.currentUser;
        setIsLoggedIn(user !== null);
      }, []);
    
    return (
        <>
            <Header title={title} home={home} isLoggedIn={isLoggedIn} />
            <Outlet context={{isLoggedIn}} />
        </>
    )
}