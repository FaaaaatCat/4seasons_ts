import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";

interface HeaderProps{
    title: string;
    home?: boolean;
    isLoggedIn: boolean;
}

export default function Header({ title, home, isLoggedIn }: HeaderProps) {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login')
    }
    return (
        <div className="header">
            <div className='flx-row flx-1 gap-2'>
                {home ? (
                    <div className='logo'>로고</div>
                ) : (
                    <>
                    <button className='btn btn-icon-only' onClick={() => navigate(-1)}>
                        <HiArrowLeft size="24" />
                    </button>
                    <p>
                        {title}
                    </p>
                    </>
                    )
                }
            </div>
            {
                isLoggedIn ?
                    <Link to="/profile">
                        <button className='my-btn btn-icon-only'>Profile</button>
                    </Link>
                : <button onClick={goToLogin}>로그인</button>
            }
        </div>
    )
}