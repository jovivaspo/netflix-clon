import React from 'react'
import './HomeScreen.css'
import Nav from './Nav'
import Banner from './Banner'
import API from '../config/api'
import Row from './Row'

const HomeScreen = () => {
    return (
        <div className='homeScreen'>

            <Nav />
           
           <Banner />

           <Row title='NETFLIX ORIGINAL' fetchUrl={API.requests.fetchNextflixOriginals} islargeRow={true} />
           <Row title='Trending now' fetchUrl={API.requests.fetchTrending} />
           <Row title='Action Movies' fetchUrl={API.requests.fetchActionMovies} />
           <Row title='Horror Movies' fetchUrl={API.requests.fetchHorrorMovies} />
           <Row title='Romance Movies' fetchUrl={API.requests.fetchRomanceMovies} />
           <Row title='Documentaries' fetchUrl={API.requests.fetchDocumentaries} />



        </div>
    )
}

export default HomeScreen
