import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard"

import "./MoviesGrid.css"

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
    const [searchParams] = useSearchParams()

    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

       const getSearchedMovies = async (url) => {
           const res = await fetch(url, {
               method: 'GET',
               headers: {
                   accept: 'application/json',
                   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGNhYTg5MGI1ZjU2YWY4YjUwYjkwMmUyNWMzZmU0ZSIsIm5iZiI6MTczODUxMzQwOC4zMDA5OTk5LCJzdWIiOiI2NzlmOWMwMDI4YmI5N2RkZDM5NTZmODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4xfSx3LnLOebnF5FmTCmCt7PAwspUdeMnG3V0gdqjnU'
                 }   
           })
           const data = await res.json()
   
           setMovies(data.results)
           
       }
   
       useEffect(() => {
   
           const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
   
           getSearchedMovies(searchWithQueryURL)
           
       }, [query]) 


    return (
        <div className="container"> 
           <h2 className="title">Resutados para: <span className="query-text">{query}</span></h2>
           <div className="movies-container">
            {movies?.length === 0 && <p>carregando...</p>}
            {movies?.length > 0 ?  movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>) : <p>Nenhum filme encontrado</p>}

           </div>
        </div>
    )

}

export default Search;