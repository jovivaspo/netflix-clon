import React from 'react'
import './ProfileScreen.css'
import Nav from '../Components/Nav'
import { useSelector } from 'react-redux'
import { auth } from '../config/firabase'
import PlanScreen from './PlanScreen'


const ProfileScreen = () => {
    const {user} = useSelector(state=>state)
   
    return (
        <div className='profileScreen'>
            <Nav />
            <div className='profileScreen__body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen__info'>
                    <img src='https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg' />
                    <div className='profileScreen__details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen__plans'>
                             <h3>Plans</h3>
                             <PlanScreen/>
                            <button onClick={()=>
                               { auth.signOut()
                                window.location.reload()}
                            } className='profileScreen__SignUp'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
