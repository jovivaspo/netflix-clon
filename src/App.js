import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './Pages/HomeScreen';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginScreen from './Pages/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firabase';
import { logout,login, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import ProfileScreen from './Pages/ProfileScreen';

function App() {
  const user = useSelector(selectUser)
  console.log(user)
   const dispatch = useDispatch()

  useEffect(()=>{
    
   const unsubscribe = onAuthStateChanged(auth,(userAuth)=>{
     if (userAuth){
      console.log(userAuth)
      dispatch(login({
        uid:userAuth.uid,
        email:userAuth.email 
      }))
     }else {
      dispatch(logout)
     }
   })

   return unsubscribe

  },[dispatch])


  return (
    <div className="app">
      <Router>
        {!user ? (<LoginScreen />) :
          (<Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='profile' element={<ProfileScreen/>} />
          </Routes>)
        }

      </Router>
    </div>

  );
}

export default App;
