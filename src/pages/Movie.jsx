import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2,BsHourglassSplit, BsFillFileEarmarkTextFill } from "react-icons/bs";
import MovieCard from "../components/MovieCard";

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Movie = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    
    const getMovie = async(url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGNhYTg5MGI1ZjU2YWY4YjUwYjkwMmUyNWMzZmU0ZSIsIm5iZiI6MTczODUxMzQwOC4zMDA5OTk5LCJzdWIiOiI2NzlmOWMwMDI4YmI5N2RkZDM5NTZmODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4xfSx3LnLOebnF5FmTCmCt7PAwspUdeMnG3V0gdqjnU'
              }   
        })
        const data = await res.json()

        setMovie(data)
    }

        const formatCurrency = (number) => {
            return number.toLocaleString("en-US", {
                style: "currency",
                currency:"USD"
            })
        }
    

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`
        getMovie(movieUrl)

    }, [])


    return (
        <div className="movie-page">
            {movie && (
                <>
                <MovieCard movie={movie} showLink={false}/>
                <p className="tagline">{movie.tagline}</p>
                <div className="info">
                    <h3>
                        <BsWallet2/> Orçamento
                    </h3>
                    <p>{formatCurrency(movie.budget)}</p>   
                </div>
                <div className="info">
                    <h3>
                        <BsGraphUp/> Receita :
                    </h3>
                    <p>{formatCurrency(movie.revenue)}</p>   
                </div>
                <div className="info">
                    <h3>
                        <BsHourglassSplit/> Duração
                    </h3>
                    <p>{movie.runtime} minutos</p>   
                </div>
                <div className="info description">
                    <h3>
                        <BsFillFileEarmarkTextFill/> Descrição
                    </h3>
                    <p>{movie.overview}</p>   
                </div>
                </>
            )}
        </div>
    )

}

export default Movie;