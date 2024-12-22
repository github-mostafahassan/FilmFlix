


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../LOADING/Loading'
import Aos from 'aos'
import "aos/dist/aos.css"
import PEPOLECSS from "./pepole.module.css"
import { Link } from 'react-router-dom'

function People() {

    let [ query , setQuery] = useState()
    let [ results , setResults] = useState()

    

    useEffect( ()=>{
        Aos.init( {duration : 2500} )


        async function getNameActors() {   


        
            try{

                let response = await axios.get( `https://api.themoviedb.org/3/search/person?api_key=eba8b9a7199efdcb0ca1f96879b83c44` , {
                      params: {
                          query : query,
                          language: 'ar' 
                        }
            
                        
                  })

                  setResults(response.data.results)

                  
                  
                }

                catch(err){
                    console.log(err);
                }

        }
        
            
            
    

    


        
            
                


        getNameActors()

        
    }  , [query])


    


        async function getAllPeople(){
            return axios.get("https://api.themoviedb.org/3/trending/person/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        }

        let { data , isError, isLoading } = useQuery("getAllPeople" , getAllPeople)

        console.log("m" , data?.data);

        

        if (isLoading) {
            return <Loading/>
        }

    return <>
    
    <div className="container p-4 my-3">
    <h1 data-aos="flip-up" className=' text-white'>Actors</h1>

                

                
                <div className="container text-center">


                <div className={" search my-5"}>
                <form data-aos="flip-up" action="" className=' bg-white col-lg-6 col-md-12 m-auto p-1 rounded-5'>
                <input value={query} placeholder='ابحث عن ممثل...' onChange={  (e)=>{setQuery(e.target.value) } } type="text" className=' w-100 m-auto p-2 rounded-5 bg-transparent text-black' />
                </form>


                            <div className="row mt-5">
                            {results?.map(( searchAllPeople , inx)=>{
                                console.log( "searchAllPeople" , searchAllPeople );
                                
                                return <div key={inx} className="col-lg-3 col-md-6 rounded-3">
                                    
                                    <div  className={PEPOLECSS.innar + " rounded-3"}>
                                    <Link to={`/Actor/${searchAllPeople.id}/${searchAllPeople.name}`}>
                                        <figure data-aos="zoom-in-up" className=' position-relative'>
                                        <img className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" +  searchAllPeople.profile_path } alt={searchAllPeople.name} />

                                        {searchAllPeople.profile_path ? <figcaption className=' position-absolute start-0 end-0 text-center text-white rounded-bottom-2 bottom-0 bg-dark p-2'>
                                        <h3 className=' h5'>{searchAllPeople.name}</h3>
                                        </figcaption> : "" }
                                        
                                        </figure>
                                        </Link>

                                        { searchAllPeople.profile_path ? <div className={PEPOLECSS.ratingSection + " my-3"}>
                                            <div className={PEPOLECSS.rating + " p-3"}>
                                                <h3 className={PEPOLECSS.ratingValue}>{searchAllPeople.popularity + ""}</h3>
                                            </div>
                                        </div> : "" }
                                    </div>
                                    
                                    
                                </div>
                            } )}
                            </div>
                            </div> 
                
                
                </div>
    <div className="row p-3 mt-3">


        {data.data.results.map( (people , idx)=>{

            console.log("people" , people);
            
            return <div key={idx}  className="col-lg-3 col-md-6 g-3 ">
            <div   className={PEPOLECSS.innar + " rounded-3"}>
             <Link to={`/Actor/${people.id}/${people.name}`}>
             <figure data-aos="zoom-in-up" className=' rounded-3 position-relative'>
                    <img className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + people.profile_path} alt={people.name} />

                    <figcaption className=' position-absolute start-0 end-0 text-center text-white rounded-bottom-2 bottom-0 bg-dark p-2'>
                        <h3 className=' h5'>{people.name}</h3>
                    </figcaption>

                    
                </figure>
             </Link>
                


                { people.profile_path ? <div className={PEPOLECSS.ratingSection }>
                <div className={PEPOLECSS.rating + " p-3"}>
                    <h3 className={PEPOLECSS.ratingValue}>{people.popularity + ""}</h3>
                </div>
            </div> : "" }


            
            
            </div>
        </div>
        } )}
        
    </div>


                
    </div>
    
    </>
}




export default People
