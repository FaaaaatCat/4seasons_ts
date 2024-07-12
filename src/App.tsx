import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import CreateAccount from './routes/create-account';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import LoadingScreen from './components/loading-screen';
import { auth } from './firebase';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //오직 로그인한 유저만 사용
    children: [
      {
        path: "",
        element : <Home />
      },
      {
        path: "profile",
        element : <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  }
])

const GlobalStyles = createGlobalStyle`
${reset};
body{
  color:red;
}
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false)
    // setTimeout(() => setIsLoading(false), 2000) //처음에 로딩 화면을 주고 싶다면
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* <RouterProvider router={router} /> */}
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      
    </>
  )
}

export default App
