const BASE_URL=process.env.REACT_APP_BASE_URL
const ACESS_TOKEN= process.env.REACT_APP_ACESS_TOKEN

export const getMovies =async()=>{
    try{
        const  response =await fetch(`${BASE_URL}/3/movie/popular`,{
            method: 'GET',
            headers:{
                Authorization:`Bearer ${ACESS_TOKEN}`

            }

        })
       const result  = await response.json(); 
       return result

    }
    catch(error){
        return error.message
    }

}