import React,{useState,useEffect} from 'react'
import { getData } from '../services/getData'
import './Row.css'

const Row = ({title,fetchUrl, islargeRow=false}) => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        getData(fetchUrl)
        .then(res=>{
           
            setMovies(res.results)
        })
        
    }, [fetchUrl])

   // console.log(movies)

    const BASE_URL = 'https://image.tmdb.org/t/p/original'

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
            {
              movies?.map((movie)=>
              ((islargeRow && movie.poster_path) ||
              (!islargeRow && movie.backdrop_path)) && (
                  <img
                  className={`row__poster ${islargeRow && "row__posterLarge"}`}
                  key={movie.key}
                  src={`${BASE_URL}${islargeRow? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                  />
              )
              )}
            </div>
          
        </div>
    )
}

export default Row
