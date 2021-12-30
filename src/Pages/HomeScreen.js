import React from 'react'
import './HomeScreen.css'
import Nav from '../Components/Nav'
import Banner from '../Components/Banner'
import API from '../config/apiFilms'
import Row from '../Components/Row'

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
