import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth, dbService } from './firebase';
import { createGlobalStyle } from 'styled-components';

import reset from 'styled-reset';
import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import CreateAccount from './routes/create-account';
import LoadingScreen from './components/loading-screen';
import ProtectedRoute from './components/protected-route';
import Attend from './routes/attend';
import Member from './routes/member';
import Shop from './routes/shop';
import Mission from './routes/mission';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { Auth, updateCurrentUser } from 'firebase/auth';

// const router = createBrowserRouter([
//   //로그인한 사용자가 보는 화면
//   {
//     path: "/",
//     element: <ProtectedRoute>
//       <Layout />
//     </ProtectedRoute>, //오직 로그인한 유저만 사용
//     children: [
//       {
//         path: "",
//         element : <Home />
//       },
//       {
//         path: "profile",
//         element : <Profile />
//       },
//       {
//         path: "attend",
//         element : <Attend />
//       },
//       {
//         path: "member",
//         element : <Member />
//       },
//       {
//         path: "shop",
//         element : <Shop />
//       },
//       {
//         path: "mission",
//         element : <Mission />
//       }
//     ]
//   },
//   //로그인 전에 보는 화면
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/create-account",
//     element: <CreateAccount />
//   }
// ])




//글로벌 스타일 만드는 곳
const GlobalStyles = createGlobalStyle`
${reset};
body{
  //color:red;
}
`;


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false)
    getFbUserObj(user);
    // setTimeout(() => setIsLoading(false), 2000) //처음에 로딩 화면을 주고 싶다면
  };

  //회원가입한 유저데이터 읽어오기
  interface UserData {
    item: string;
    money: number;
    id: string;
  }
  const [fbUserObj, setFbUserObj] = useState<UserData[] | null>(null);
  const user = auth.currentUser;
  const getFbUserObj = async (user) => {
    //1. 현재 uid와 일치하는 유저 데이터 받아오기
    const q = query(
      collection(dbService, "user"),
      where("uid", "==", user?.uid)
    );
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((doc) => {
          const { item, money } = doc.data();
          return {
              item,
              money,
              id: doc.id,
          };
      });
      setFbUserObj(userData);
    })
    return () => { unsubscribe() }
  };

  const router = createBrowserRouter([
  {
    path: "",
    element: <Layout title="홈" home />,
    children: [
      {index: true, element: <Home />}
    ]
  },
  {
    path: "profile",
    element: <Layout title="Profile"  />,
    children: [
      {index: true, element: <Profile />}
    ]
  },
  {
    path: "attend",
    element: <Layout title="출석"   />,
    children: [
      {index: true, element: <Attend />}
    ]
  },
  {
    path: "member",
    element: <Layout title="멤버란"   />,
    children: [
      {index: true, element: <Member />}
    ]
  },
  {
    path: "shop",
    element: <Layout title="상점"   />,
    children: [
      {index: true, element: <Shop />}
    ]
  },
  {
    path: "mission",
    element: <Layout title="의뢰 게시판"   />,
    children: [
      {index: true, element: <Mission />}
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  },
])

  useEffect(() => {
    init();
  }, []);
  const refreshUser = async () => {
    getFbUserObj(user);
    await updateCurrentUser(auth, user);
  }
  return (
    <>
      <GlobalStyles />
      <div className='background'></div>
      <div className='center'>
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </div>
      
      
    </>
  )
}

export default App
