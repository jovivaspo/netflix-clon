import React,{useState,useEffect} from 'react'
import './Nav.css'

const Nav = () => {
    const [show, handleShow] = useState(false)

    const transitionNavBar=()=>{
        if(window.scrollY > 100){
            handleShow(true)
        }else {
            handleShow(false)
        }
    }

    useEffect(() => {
      window.addEventListener('scroll', transitionNavBar)
        return ()=> window.removeEventListener('scroll',transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`} >
            <div className='nav__contents'>
                <img className='nav__logo' src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                    alt='logo Netflix'
                     />
                <img className='nav__avatar' src='https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'
                    alt='profile'
                    />
            </div>
        </div>
    )
}

export default Nav
