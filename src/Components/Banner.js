import React,{useState,useEffect} from 'react'
import './Banner.css'
import { getData } from '../services/getData'
import API from '../config/apiFilms'

const Banner = () => {

    const [movie, setMovie] = useState([])

    useEffect(() => {
      
       getData(API.requests.fetchNextflixOriginals)
       .then(res=>{
        console.log(res.results)
        setMovie(res.results[
            Math.floor(Math.random()*res.results.length -1)
        ])
      
       })
    }, [])

    console.log(movie)

    function truncate (string, number){
        return string?.length > number ? string.substr(0,number -1) + '...' : string
    }

    return (
        <header className='banner' style={{
            backgroundSize:'cover',
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition:'center center',
        
        }
        }> 

         <div className='banner__contents'>
             <h1 className='banner_title'>{movie?.name || movie?.title || movie?.original_name}</h1>
             <div className='banner__buttons'>
                 <button className='banner_button'>Play</button>
                 <button className='banner_button'>My list</button>
                 
                 <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
             </div>
         </div>
         <div className='banner--fadeBottom'/>
        </header>
    )
}

export default Banner
