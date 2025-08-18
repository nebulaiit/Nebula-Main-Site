import MockInterview from "../Pages/MockInterview/MockInterview";

export const API_URLs = {
    GET_LOGIN: "/auth/tutorial/login",
    GET_SIGNUP: "/auth/tutorial/signup",
    GET_SIGNUP_WITHGOOGLE: "/auth/tutorial/google",
    Get_User_Details: "/auth/tutorial/user-details",
    CONTACT:"/api/contact",

    GET_TUTORIAL:"/api/languages",
    GET_TUTORIAL_details:"/api/languages",
    GET_TUTORIAL_OVERVIEW:"/api/languages/overview",
    GET_TOPICS : "/api/topics/by-language",
    GET_CONTENT_BY_SLUG:"/api/pages/topic",
    
    Get_Course_List:"/api/courses/language",
    Get_Course_Details:"/api/courses",
    
    Get_All_posts:"/api/community/all-posts",
    Create_Post:"/api/community/post",
    Reply_To_Post:"/api/community/posts/",

    WishList:'/api/wishlist',
    
    Mock_Interview:"/api/mock-interview",

    Get_Job_Details:"/api/jobs/job-details",
    Get_Job_list:"/api/jobs",
    
    Add_BLog:"/api/blogs/add-blog",
    Blog_List:"/api/blogs/blog-list",
    Blog_Details:"/api/blogs/details",
}

export const API_BASE_URL = "http://localhost:8080";



