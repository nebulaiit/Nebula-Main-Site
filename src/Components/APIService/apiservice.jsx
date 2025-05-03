import axios from 'axios';  
import { API_BASE_URL, API_URLs } from './constant';


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