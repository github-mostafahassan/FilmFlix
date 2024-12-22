import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UpcomingCss from "./upcoming.module.css";
import { Search } from '../SEARCH/Search';
import Loading from '../LOADING/Loading';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';




export function Upcoming() {
    

     
    const getUpcomingMovies = async () => {
        return axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44");

    };

    let { data , isLoading} = useQuery("getUpcomingMovies" , getUpcomingMovies)


    useEffect(() => {
        Aos.init({ duration: 2500 });
    }, []);
    
    

    if (isLoading == true) {
        return <Loading/>
    }


    return (
        <>
            {data.data.results.length > 0 ? (
                <div className="container py-5">
                    <div className="row gy-3">
                        <h1 data-aos="flip-left" className='py-4 fw-bold text-white'>Upcoming</h1>
                        <Search />
                        {data.data.results.map((upcoming) => (
                            <div key={upcoming.id} className="col-lg-3 rounded-4 col-md-6 col-sm-12 g-4">
                                                            
                                <Link to={`/Detailse/${upcoming.id}`}>
                                
                                <div data-aos="zoom-in-up" className={UpcomingCss.innar + "  rounded-4"}>
                                    <figure className='position-relative h-100'>
                                        <img
                                            className='w-100 rounded-4 h-100'
                                            src={"https://image.tmdb.org/t/p/original" + upcoming.backdrop_path}
                                            
                                            alt={upcoming.title}
                                        />
                                        <figcaption className='position-absolute p-3 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column rounded-4 text-white'>
                                            <h3 className='text-danger'>{upcoming.title}</h3>
                                            <p>{upcoming.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>
                                        </figcaption>
                                        <div className={UpcomingCss.favorite + " position-absolute"}>

                                            <Link to={`/NowPlaying/${upcoming.id}/${upcoming.name  ? upcoming.name : upcoming.title}`}>
                                            <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}></i>                                            </Link>

                                        </div>
                                        <div className={UpcomingCss.rating + " position-absolute"}>
                                            <h6 className=' d-flex align-items-center text-white'>{upcoming.vote_average}</h6>
                                        </div>

                                    </figure>
                                </div>

                                </Link>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Upcoming;


