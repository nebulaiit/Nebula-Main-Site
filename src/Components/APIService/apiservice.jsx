import axios from 'axios';  
import { API_BASE_URL, API_URLs } from './constant';


//login api
 export const loginUser = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.GET_LOGIN}`;  

   try {
        const response = await axios.post(url, body)
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

 export const  signUpUser = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.GET_SIGNUP}`;  

   try {
        const response = await axios.post(url, body)
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
};

export const getUserDetails = async (id) =>{

    const url = `${API_BASE_URL}${API_URLs.Get_User_Details}/${id}`
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}


export const getAllTutorial = async () =>{

    const url = `${API_BASE_URL}${API_URLs.GET_TUTORIAL}`

  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getHeadingList = async (tutorialName) =>{

    const url = `${API_BASE_URL}${API_URLs.GET_HEADING_LIST}/${tutorialName}`

  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getContentList = async (urlSlug) =>{

    const url = `${API_BASE_URL}${API_URLs.GET_CONTENT_BY_SLUG}/${urlSlug}`
    console.log(url)
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getTopics = async (id) =>{

    const url = `${API_BASE_URL}${API_URLs.GET_TOPICS}/${id}`
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}
export const contactUs = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.CONTACT}`
  
    try {
        const response = await axios.get(url,body)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getBlogList = async () =>{

    const url = `${API_BASE_URL}${API_URLs.Blog_List}`
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getBlogDetails = async (slug) =>{

    const url = `${API_BASE_URL}${API_URLs.Blog_Details}/${slug}`

    console.log(url)
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}
export const getAllPosts = async () =>{

    const url = `${API_BASE_URL}${API_URLs.Get_All_posts}`
  
    try {
        const response = await axios.get(url)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}