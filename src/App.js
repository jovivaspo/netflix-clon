import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Pages/HomeScreen';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import LoginScreen from './Pages/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firabase';
import { useDispatch, useSelector } from 'react-redux'
import ProfileScreen from './Pages/ProfileScreen';
import { login, logout } from './actions/user';



function App() {
  const { user } = useSelector(state => state)
  const { subscription } = useSelector(state => state)
  console.log(user)
  const dispatch = useDispatch()


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout)
      }
    })

    return unsubscribe

  }, [dispatch])


  return (
    <div className="app">
      <Router>
        {!user && <LoginScreen />}
        {user && !subscription && <ProfileScreen />}
        {user && subscription &&
          (<Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='profile' element={<ProfileScreen />} />
          </Routes>)
        }
      </Router>
    </div>

  );
}

export default App;
