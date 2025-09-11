import React from 'react'

function Banner() {
  return (
    <div className='h-[120vh] md:h[60vh] bg-cover bg-center flex items-end' style={{backgroundImage : 'url(https://images.hdqwalls.com/wallpapers/avengers-poster-4k-27.jpg)'}}>
        <div className='text-white text-xl text-center w-full bg-gray-900/60 p-4'>Avengers Endgame</div>
    </div>
  )
}

export default Banner