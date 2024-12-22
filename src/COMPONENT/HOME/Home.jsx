

import axios from 'axios'
import homeCss from "./home.module.css"
import { Link } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import { Search } from '../SEARCH/Search'
import Aos from 'aos'
import "aos/dist/aos.css"






import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export function Home() {


    
    // api للفيديو

 //https://api.themoviedb.org/3/movie/1106739/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44  



    async function grtDataMovie(){

        return  axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44" )



  
      }


        let {data , isError , isLoading} = useQuery("grtDataMovie" , grtDataMovie)

        console.log("data" , data?.data);
        

        
        useEffect( ()=>{
            
            Aos.init( {duration : 2500} )
        } , [] )
        
        if (isLoading == true) {
        return <Loading/>
        }



    return <>



     { data.data.results.length > 0 ? <div  className=" container py-5 px-4">
            <div className="row gy-3">

                    
            <h1 data-aos="flip-up" className=' py-4 fw-bold text-white'>Popular</h1>






            <Search/>





                {data.data.results.map(  (movie)=> { 
                    
                    console.log(movie)
                    
                    return   <div  key={movie.id } className= {homeCss.mainCol + " col-lg-3 col-md-6 col-sm-12 rounded "}>



                            <Link to={`/Detailse/${movie.id}`}>
                            
                            <div data-aos="zoom-in-up" className={homeCss.innar + " rounded-5  position-relative "}>

                                    <figure className=' position-relative h-100 '>
                                    <img className='rounded-4 w-100 h-100'  src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} alt={movie.name} />

                                    <figcaption className= { homeCss.text + ' p-2   position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column text-white rounded-4'}>
                                        
                                        <h3 className=' text-danger'>{ movie.name  ? movie.name : movie.title}</h3>
                                        <p>{movie.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>

                                        {movie.first_air_date ? <p>Release Data : {movie.first_air_date}</p> : "" }

                                        
                                    </figcaption>

                                    <div className={homeCss.favorite + " position-absolute" }>

                                        <Link to={`/NowPlaying/${movie.id}/${movie.name  ? movie.name : movie.title}`}>
                                        <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}></i>                                </Link>
                                    </div>
                                    </figure>

                                    <div className={homeCss.rating + " position-absolute"}>
                                        <h6 className=' d-flex align-items-center text-white'>{movie.vote_average}</h6>
                                    </div>
                                    </div>

                            </Link>

                            

                    
                </div>
                } 
            ) }
            
          
                
            </div>
        </div> : ""}
                




    
    </>
}

export default Home













   

    







    

    //


 