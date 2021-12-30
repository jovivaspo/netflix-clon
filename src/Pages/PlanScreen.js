import React, { useState, useEffect } from 'react'
import db from '../config/firabase'
import './PlanScreen.css'
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { subscribe } from '../actions/subs'
import { useSelector,useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'


const PlanScreen = () => {
    const [products, setProducts] = useState([])
    const {user, subscription} = useSelector(state=>state)
   
     const dispatch = useDispatch()

    useEffect(()=>{
        const checkSub = () =>{
            const refSub = collection(db,'customers',user.uid,'subscriptions')
            getDocs(refSub)
            .then(sub=>{
                    console.log(sub.docs[0].data())
                    dispatch(subscribe({
                        sub: sub.docs[0].data().role,
                        start: sub.docs[0].data().current_period_start.seconds,
                        end: sub.docs[0].data().current_period_end.seconds
                    }))
            })
        }

        checkSub()
       
        
    },[])


    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true))
        getDocs(q)
            .then((querySnapshot) => {
                //console.log(querySnapshot)
                const products = {}
                querySnapshot.forEach((productDoc) => {
                    products[productDoc.id] = productDoc.data()
                    getDocs(collection(productDoc.ref, "prices"))
                        .then(priceSnap => {
                            //console.log(priceSnap)
                            priceSnap.docs.forEach(price => {
                                products[productDoc.id].prices = {
                                    pricesId: price.id,
                                    priceData: price.data()
                                }
                            })
                        })

                })

                setProducts(products)

            })

    }, [])

   

  

    const loadCheckout = async (priceId) => {
     
       const checkSession = async (docRef) => {
            onSnapshot(docRef, async (snap) => {
                const { error, sessionId } = snap.data()
                console.log(snap.data())
                if (error) {
                    alert(error.message)
                }
                if (sessionId) {
                    const stripe = await loadStripe('pk_test_51K8RJJHlbeHKBAunGfGUjNSSJzePVuxvoVfhIV1vZ3ypV7jvkvC1ZafGdOdPtg4dPJG3cDwwgrXMFgFzfP1Q65Q700tHCs9WQO')
                    stripe.redirectToCheckout({ sessionId })
                }
            })

        }

        const docRef = doc(db, 'customers', user.uid, 'checkout_sessions', priceId)

        await setDoc(docRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })


        await checkSession(docRef)


    }

    console.log(products,subscription)

    return (
        <div className='planScreen'>
            {subscription && <p>Renewal date: {new Date(subscription?.end *1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className='planScreen__plan'>
                        <div className='planScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button style={{textDecoration: subscription?.sub === productData.name.toLowerCase()? 'underline' : 'none',
                        backgroundColor:subscription?.sub === productData.name.toLowerCase()? 'grey' : '#e50914'}}
                         onClick={() => loadCheckout(productData.prices.pricesId)}>{subscription?.sub===productData.name.toLowerCase()? 'Subscribed' : 'Subscribe'}</button>
                    </div>
                )
            })}

        </div>
    )
}

export default PlanScreen
