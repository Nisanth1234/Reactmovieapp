import React, { useEffect, useState } from 'react'
import Moviecard from '../component/Moviecard'


const Home = () => {
    const [movies, setmovies] = useState([])
    const [page, setpage] = useState(1)
    const [search,setsearch]=useState("")


    useEffect(() => {
        let url=`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=95354caa99e45bc4f3ed68c05e558542`
        if(search){
            url=`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=95354caa99e45bc4f3ed68c05e558542`
        }
        fetch(url)
        .then((res) => res.json())
        .then((data)=> setmovies(data.results))
    }, [page,search]);
    

    return (
        <div className='p-4 pt-16'>
            <input onChange={(e)=>{
                setsearch(e.target.value)
            }} 
                type="text" 
                placeholder='Search Movies...' 
                className='p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10' 
            />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16'>
                {movies.map((movie) => {
                 return <Moviecard key={movie.id} movie={movie} />
                })}
            </div>
            <div className='pagination-container flex justify-between mt-5'>
                <button disabled={page == 1}
                onClick={()=>{
                    setpage((prev)=>prev-1)
                }} className='p-2 bg-gray-700 text-white rounded'>PREV</button>

                <p>Page No:{page}</p>

                <button onClick={()=>{
                    setpage((prev)=>prev+1)
                }}
                className='p-2 bg-gray-700 text-white rounded'>NEXT</button>
            </div>
        </div>
    )

}

export default Home;
