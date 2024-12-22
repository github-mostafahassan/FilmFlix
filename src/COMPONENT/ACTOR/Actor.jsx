

import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import ActorCss from "./actor.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Actor() {

    let myNavigate = useNavigate()

    useEffect( ()=>{
    Aos.init({duration : 3000})
    } , [] )


    let { id , name } = useParams()


        async function aboutTheActor() {
            
            return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

        }

        let { data , isError , isLoading } = useQuery("aboutTheActor" , aboutTheActor)

        
        async function getImagesp () {
            return axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        }

        let x = useQuery("getImagesp" , getImagesp)


console.log("jhhg" , x.data?.data.profiles);


            




        
        console.log("daetade" , data?.data);

        
        
        if (isLoading == true && x.isLoading == true ) {
            return <Loading/>
        }

        function back() {
            myNavigate("/People")
        }



        var settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: true,            
            autoplaySpeed: 3000,       
            pauseOnHover: true,  
          };
          

          


    return <>

    <div className="container mt-4">
    <h1 data-aos="flip-up" className=' text-white h2'> {name} </h1>
    <div data-aos="zoom-in-up" className="row p-4 bg-white m-3 rounded-4 position-relative">

           
                <figure className=' my-4 col-12 '>
                        


                    <Slider {...settings}>
                        {x.data?.data.profiles.map( (allImages)=> {
                            return <img className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + allImages.file_path  } alt={allImages.name} /> 

                        } )}
                    </Slider>

                        
                </figure>
                
                <div className="col-12 px-3">
                <figcaption>
                    <h2 style={{color : "#00d30b"}}>{data.data.name}</h2>
                    <p>{data.data.biography}</p>
                    <ul className={ActorCss.ul }>
                        <li className=' col-lg-4 col-md-12 mb-1 text-white fw-bold p-2 rounded-1 '><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>birthday</span> : {data.data.birthday  }  </li>
                        <li className=' col-lg-4 col-md-12 mb-1 text-white fw-bold p-2 rounded-1'><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>place of birth</span> : {data.data.place_of_birth  }  </li>
                        <li className=' col-lg-4 col-md-12  text-white fw-bold p-2 rounded-1'><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>popularity</span> : {data.data.popularity }  </li>
                        <Link to={data.data.homepage }> {data.data.homepage} </Link>   
                    </ul>
                </figcaption>
                </div>

                <div onClick={back} style={{backgroundColor : "red" , width : "fit-content" , cursor : "pointer"}} className="back position-absolute start-0 bottom-0 text-white p-2 rounded-end-2">
                <i  class="fa-solid fa-arrow-left fa-1x"></i>
                </div>
    </div>

    </div>    
    </>
}

export default Actor
