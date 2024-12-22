


import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

import TrandingCss from "./tranding.module.css"
import Loading from '../LOADING/Loading'
import { Link } from 'react-router-dom'
import { Search } from '../SEARCH/Search'


function Trading() {


        async function trandingMoveis() {
            return axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        }




        let { data , isLoading} = useQuery( "trandingMoveis" , trandingMoveis )
 

if (isLoading) {
    return <Loading/>
}



    return <>
    

    {data.data.results.length > 0 ? <div className="container mt-3 p-4">


        <h1 className=' text-white'>Tranding</h1>

        <Search/>

        <div className="row">


            {data.data.results.map( (tranding , idx)=> { 
                return <div key={idx} className="col-lg-3 col-md-6 col-sm-12 g-4">
                
                <Link to={`/Detailse/${tranding.id}`}>
                
                <div data-aos="zoom-in-up" className={TrandingCss.innar + "  rounded-4"}>
                    <figure className='position-relative h-100'>
                        <img
                            className='w-100 rounded-4 h-100'
                            src={"https://image.tmdb.org/t/p/original" + tranding.backdrop_path}
                            alt={tranding.title}
                        />
                        <figcaption className='position-absolute p-3 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column rounded-4 text-white'>
                            <h3 className='text-danger'>{tranding.title}</h3>
                            <p>{tranding.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>
                        </figcaption>
                        <div className={TrandingCss.favorite + " position-absolute"}>

                            <Link to={`/NowPlaying/${tranding.id}/${tranding.name ? tranding.name : tranding.title }`}>
                            <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}></i>
                            </Link>

                        </div>
                        <div className={TrandingCss.rating + " position-absolute"}>
                            <h6 className=' d-flex align-items-center text-white'>{tranding.vote_average}</h6>
                        </div>

                    </figure>
                    </div>

                </Link>

                



</div>
            } )}
            
        </div>
    </div> : ""}
    
    

    </>
}

export default Trading
