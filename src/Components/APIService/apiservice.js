import axios from "axios";
import { API_BASE_URL, API_URLs } from "./constant";

//login api
export const loginUser = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.GET_LOGIN}`;

  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const signUpUser = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.GET_SIGNUP}`;

  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const verifyUserCode = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.Verify_Code}`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const signUpUserWithGoogle = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.GET_SIGNUP_WITHGOOGLE}`;

  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const contactUs = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.CONTACT}`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getUserDetails = async (id) => {
  const url = `${API_BASE_URL}${API_URLs.Get_User_Details}/${id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getTutorialOverview = async (slug) => {
  const url = `${API_BASE_URL}${API_URLs.GET_TUTORIAL_OVERVIEW}/${slug}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getAllTutorial = async () => {
  const url = `${API_BASE_URL}${API_URLs.GET_TUTORIAL}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getTutorialDetails = async (slug) => {
  const url = `${API_BASE_URL}${API_URLs.GET_TUTORIAL_details}/${slug}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getContentList = async (urlSlug) => {
  const url = `${API_BASE_URL}${API_URLs.GET_CONTENT_BY_SLUG}/${urlSlug}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getTopics = async (id) => {
  const url = `${API_BASE_URL}${API_URLs.GET_TOPICS}/${id}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getAllCourse = async (courseName) => {
  const url = `${API_BASE_URL}${API_URLs.Get_Course_List}/${courseName}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getCourseDetails = async (id) => {
  const url = `${API_BASE_URL}${API_URLs.Get_Course_Details}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getBlogList = async () => {
  const url = `${API_BASE_URL}${API_URLs.Blog_List}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getBlogDetails = async (slug) => {
  const url = `${API_BASE_URL}${API_URLs.Blog_Details}/${slug}`;

  console.log(url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const addBlogs = async (formData) => {
  const url = `${API_BASE_URL}${API_URLs.Add_BLog}`;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getAllPosts = async () => {
  const url = `${API_BASE_URL}${API_URLs.Get_All_posts}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const createPost = async (body, id) => {
  const url = `${API_BASE_URL}${API_URLs.Create_Post}/${id}`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const ReplyToPost = async (body) => {
  const url = `${API_BASE_URL}${API_URLs.Reply_To_Post}`;
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getJobById = async (id) => {
  const url = `${API_BASE_URL}${API_URLs.Get_Job_Details}/${id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getJobList = async () => {
  const url = `${API_BASE_URL}${API_URLs.Get_Job_list}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const fetchWishlist = async (userId) => {
  const url = `${API_BASE_URL}${API_URLs.WishList}/${userId}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const addWishlistItem = async (userId, item) => {
  const url = `${API_BASE_URL}${API_URLs.WishList}/${userId}`;

  try {
    const response = await axios.post(url, item);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const deleteWishlistItem = async (wishlistItemId) => {
  const url = `${API_BASE_URL}${API_URLs.WishList}/${wishlistItemId}`;

  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

export const getMockInterview = async (params) => {
  const url = `${API_BASE_URL}${API_URLs.Mock_Interview}`;

  console.log(url, null, { params });
  try {
    const response = await axios.post(url, null, { params });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
export const getAtsScore = async (formData) => {

  const url = `${API_BASE_URL}${API_URLs.Ats_Score}`;

  try {
    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};
