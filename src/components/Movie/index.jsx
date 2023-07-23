import React,{useState,useEffect} from "react";
import { getMovies } from "../../utils/utilities";
import './style.css';
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL
const MovieList = ()=>{
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        (async()=>{
            const movies = await getMovies();
            setMovies(movies.results);
            setLoading(false);
            console.log({movies});
        })();
    },[]);
    if(loading){
        return <h1>loading...</h1>
    }
    return(
        <div className="imageContainer">
            {movies && loading === false && movies.length > 0 && movies.map(
          (item)=>(
            <div key={item.id}className="images">
                <img src = {`${IMAGE_BASE_URL}${item.poster_path}`}
               alt = {item.title}
            />
            </div>
                )) }
                </div>
    )}
 export default MovieList;