

import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import DetailseCss from "./detailse.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Detailse() {

    let myNavigate = useNavigate()

    let { id } = useParams()

    useEffect( ()=>{
        Aos.init( {duration : 3000} )
    } , [] )


    async function getDetailseMovei() {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44 `)
    }

    let {  data , isError , isLoading} = useQuery("getDetailseMovei" , getDetailseMovei)


    console.log("data?.data" , data?.data);

    async function getAllImagesMoveis() {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    }

    let x = useQuery( "getAllImagesMoveis" , getAllImagesMoveis )

    console.log("mostafa" , x.data?.data.backdrops );
    

    if (isLoading && x.isLoading == true) {
        return <Loading/>
    }

    console.log("data.data.homepage", data.data.homepage);
    
    
    function back() {
        return myNavigate("/Home")
    }



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,            
            autoplaySpeed: 3000,       
            pauseOnHover: true, 
      };
    

    return <>


    <div className="container my-4 p-4 text-white">
        <h1 data-aos="flip-up" className=' mb-4'>{data.data.tagline }</h1>
        <div data-aos="zoom-in-up" className={DetailseCss.row + " row py-5 rounded-2 bg-white position-relative"}>
            <div className="col-lg-4 col-md-12 text-center ">
                <figure className=' w-100 '>
                    
                            <Slider {...settings}>
                                    {x.data?.data.backdrops.map( (img)=>{
                                        return  <img className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + img.file_path   } alt={img.original_title} />

                                    } )}
                            </Slider>
                </figure>
                
            </div>
            <div className="col-lg-8">
                    <figcaption>
                        <h2>{data.data.original_title}</h2>
                        <p className=' text-black'>{data.data.overview}</p>
                        <Link className=' py-2' to={data.data.homepage}>{data.data.homepage}</Link>

                        <div className={DetailseCss.contant + "  d-flex justify-content-between text-white p-1"}>
                                
                                
                                <h5 className=' p-2 rounded col-lg-3 col-12 h6 text-center'>popularity : {data.data.popularity}</h5>
                                
                                
                                <h5 className=' p-2 rounded col-lg-3 col-12 h6 text-center'>Vote Average : {data.data.vote_average  }</h5>
                                
                                <h5 className=' p-2 rounded col-lg-3 col-12 h6 text-center'>Vote Count : {data.data.vote_count  }</h5>
                                

                        </div>
                    </figcaption>

                    <div onClick={ back } style={{"backgroundColor": "#ff0505"}} className={DetailseCss.back +  " text-white  position-absolute start-0 bottom-0 d-flex justify-content-center align-items-center rounded-end-3 p-2"}>
                            عوده للصفحه الرئيسيه
                    </div>
            </div>

            

        </div>
    </div>
    
    </>
}

export default Detailse
