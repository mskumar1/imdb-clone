import React, { useEffect, useState } from 'react'
import genreids from '../Utility/genre'

function WatchList({watchList, setWatchList, handleRemoveFromWatchList}) {

  const [search , setSearch] = useState('')
  const [genreList , setGenreList] = useState(['All Genres'])
  const [currGenre , setCurrGenre] = useState('All Genres')

  let handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchList.sort((movieA , movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedIncreasing])
  }

  let sortDecreasing = () => {
    let sortedDecreasing = watchList.sort((movieA , movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortedDecreasing])
  }

  useEffect(()=>{
    let temp = watchList.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All Genres' , ...temp])
  }, [watchList])

  let handleFilter = (genre) =>{
    setCurrGenre(genre)
  }

  return (
    <>
    <div className='flex justify-center flex-wrap m-4'>
      {genreList.map((genre)=>{
        return <div onClick={()=> handleFilter(genre)} className={ currGenre == genre ?'flex justify-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold items-center mx-4' : 'flex justify-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold items-center mx-4'}>{genre}</div>
      })}
      </div>
      
    <div className='flex justify-center my-4'>
      <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies' className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'/>
    </div>

    <div className='overflow-hidden rounded border border-gray-200 m-8'>
      <table className="w-full text-gray-500">
      <thead className="border-b-2 text-left">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">
            <div className="flex items-center justify-center gap-1">
              <i
                className="fa-solid fa-arrow-up cursor-pointer text-gray-500 hover:text-black"
                onClick={sortIncreasing}
              ></i>
              <span className="font-semibold">Ratings</span>
              <i
                className="fa-solid fa-arrow-down cursor-pointer text-gray-500 hover:text-black"
                onClick={sortDecreasing}
              ></i>
            </div>
          </th>
          <th className="px-6 py-3">Popularity</th>
          <th className="px-6 py-3">Genre</th>
          <th className="px-6 py-3">Action</th>
        </tr>
      </thead>

        <tbody>
          {watchList.filter((movieObj)=>{
            if(currGenre=='All Genres'){
              return true;
            } else{
              return genreids[movieObj.genre_ids[0]]==currGenre;
            }
          }).filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLowerCase())
          }).map((movieObj) => {
            return (<tr className='border-b'>
            <td className="flex items-start px-6 py-6">
              <img 
                className="h-[8rem] w-[6rem] object-cover flex-shrink-0 rounded-xl" 
                src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} 
                alt={movieObj.title} 
              />
              <div className="ml-4 max-w-xl">
                <div className="font-semibold">{movieObj.title}</div>
                <div className="text-sm text-gray-600 line-clamp-3">
                  {movieObj.overview}
                </div>
              </div>
            </td>
            <td className="px-20">{movieObj.vote_average}</td>
            <td className="px-6">{movieObj.popularity}</td>
            <td className="px-6">{genreids[movieObj.genre_ids[0]]}</td>
            <td onClick={() => handleRemoveFromWatchList(movieObj)} className='px-6 text-red-800 cursor-pointer'>Delete</td>
          </tr>)
          })}
          
        </tbody>
      </table>
    </div>

    </>
  )
}

export default WatchList