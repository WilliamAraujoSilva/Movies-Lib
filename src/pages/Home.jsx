import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css'

const Home = () => {

    const [topMovies, setTopMovies] = useState([])
    

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGNhYTg5MGI1ZjU2YWY4YjUwYjkwMmUyNWMzZmU0ZSIsIm5iZiI6MTczODUxMzQwOC4zMDA5OTk5LCJzdWIiOiI2NzlmOWMwMDI4YmI5N2RkZDM5NTZmODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4xfSx3LnLOebnF5FmTCmCt7PAwspUdeMnG3V0gdqjnU'
              }   
        })
        const data = await res.json()

        setTopMovies(data.results)
        
    }

    console.log(topMovies)

    useEffect(() => {

        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`

        getTopRatedMovies(topRatedUrl)
        
    }, [])

    return (
        <div className="container"> 
           <h2 className="title">Melhores filmes:</h2>
           <div className="movies-container">
            {topMovies?.length === 0 && <p>carregando...</p>}
            {topMovies?.length > 0 ?  topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>) : <p>Nenhum filme encontrado</p>}

           </div>
        </div>
    )

}

export default Home;