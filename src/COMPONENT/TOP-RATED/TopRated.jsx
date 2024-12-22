


import axios from 'axios'
import TopRatedCss from "./topRated.module.css"
import { Search } from '../SEARCH/Search';
import Loading from '../LOADING/Loading';
import Aos from 'aos';
import "aos/dist/aos.css"
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function TopRated() {




   async function getTopRatedMovies(){
    return axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44") ;

    
}


let { data , isLoading , isFetched} = useQuery("getTopRatedMovies" , getTopRatedMovies , {
    refetchInterval : 3000
})

// console.log("isFetched",isFetched);



useEffect( ()=>{
    Aos.init( {duration : 2500} )
} )

if (isLoading == true) {
    return <Loading/>
}


    return <>
    
    
    {data.data.results.length > 0 ? <div className="container py-5">
            <div className="row gy-3">


            <h1 data-aos="flip-left" className=' py-4 fw-bold text-white'>Top Rated</h1>

            <Search/>


              {data.data.results.map( (topRated)=> { return <div key={topRated.id} className="col-lg-3 rounded-4 col-md-6 col-sm-12">


                        <Link to={`/Detailse/${topRated.id}`}>
                        
                        <div data-aos="zoom-in-up" className={TopRatedCss.innar + " innar  rounded-4" }>
                        <figure className=' position-relative h-100 text-center'>
                            <img className=' w-100 rounded-4 h-100' src={"https://image.tmdb.org/t/p/original" + topRated.backdrop_path} alt={topRated.title} />

                            <figcaption className= {TopRatedCss.text + ' position-absolute p-3 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column rounded-4 text-white'}>
                                   
                                   <h3 className=' text-danger'>{topRated.title}</h3>
                                   <p>{topRated.overview.split(" ").slice(0, 15).join(" ") + " ..."}</p>

                            </figcaption>

                            <div className={TopRatedCss.favorite + " position-absolute" }>

                           <Link to={`/NowPlaying/${topRated.id}/${topRated.name ? topRated.name : topRated.title }`}>
                           <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}></i>                           </Link>

                             </div>
                        </figure>
                    </div>
                        
                        </Link>

                    
                </div>

              } )}

                

 
            </div>
        </div> : "" }
        
    
    </>
}

export default TopRated









