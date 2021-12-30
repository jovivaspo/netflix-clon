import React,{useRef} from 'react'
import { auth } from '../config/firabase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import './SignUpScreen.css'

const SignUpScreen = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) =>{
        e.preventDefault()
     

        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((userCredential) => {
            // Signed in
            console.log(userCredential)
            const user = userCredential.user;
        }).catch(error=>alert(error.message))

    }

    const signIn = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value
            ).then((userCredential)=>{
                console.log(userCredential)
                const user = userCredential.user;
            }).catch(error=>{
            console.log(error)
            alert(error.message)})


    }


    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input type='email' ref={emailRef} placeholder='Email'/>
                <input placeholder='Password' ref={passwordRef} type='password'/>
                <button type='submit' onClick={signIn}>Sign In</button>
                <h4>
                    <span className='signUpScreen__gray'>New to Netflix? </span>
                    <span className='signUpScreen__link' onClick={register}>Sign Up now.</span></h4>
            </form>
        </div>
    )
}

export default SignUpScreen
