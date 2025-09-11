import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({handleAddtoWatchList, handleRemoveFromWatchList, watchList}) {

  const [movies , setMovies] = useState([])
  const [pageNo , setPageNo] = useState(1)

  const handlePrev = () => {
    if (pageNo===1){
      setPageNo(pageNo)
    }
    else{
    setPageNo(pageNo - 1)
    }
  }

  const handleNext = () => {
      setPageNo(pageNo + 1)
  }

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=49b61b375f8bc131770e34c3ee5fb3e0&language=en-US&page=${pageNo}`).then(function(res){      
      setMovies(res.data.results)
    })
    }, [pageNo])

  return (
    <div className='p-5'>
        <div className='text-2xl m-5 font-bold text-center'>
            Trending Movies
        </div>
        <div className='flex flex-row flex-wrap justify-around m-5 gap-6'>
            {movies.map((movieObj)=>{
              return <MovieCard key={movieObj.id} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} watchList={watchList} handleRemoveFromWatchList={handleRemoveFromWatchList}  movieObj={movieObj}/>
            })}
        </div>
        
      <Pagination pageNo = {pageNo} handlePrev={handlePrev}  handleNext={handleNext} />
    </div>
  )
}

export default Movies

// https://api.themoviedb.org/3/person/popular?api_key=49b61b375f8bc131770e34c3ee5fb3e0&language=en-US&page=1