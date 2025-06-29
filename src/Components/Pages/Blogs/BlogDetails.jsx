import React from 'react'
import './BlogDetails.css'
import profileImage from '../../Images/profile-icon.jpg'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


export default function BlogDetails() {
    return (
        <>
            <div className="blog-details-wrapper">
                <div className="blog-detials-content-wrapper">
                    <h1>Understanding React Hooks</h1>
                    <div className="author-details">
                        <img src={profileImage} alt="" />
                        <div className='author-contact'>
                            <p><span>Author</span> - Prince Jha </p>
                            <p>June 1, 2025</p>
                        </div>
                    </div>
                    <div className="blog-details-img-wrapper">
                        <img src='https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu' alt="" />
                    </div>

                    <div className="blog-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a ullamcorper justo, et suscipit ex. Vivamus ornare eu mauris id imperdiet. Aliquam gravida ut velit at elementum. Nullam ullamcorper nisi in orci elementum fermentum. Vivamus congue, diam eget feugiat auctor, lectus est condimentum dui, id pulvinar purus nunc eu odio. Mauris semper dolor id magna tristique tincidunt. Nunc sed leo quam. Fusce laoreet ornare pulvinar.
                        </p>
                        <p>Suspendisse eleifend augue a libero consectetur, eu maximus ligula fringilla. Sed eleifend libero sed orci scelerisque pretium. Sed ut pretium diam. Donec a viverra velit. Sed sodales, libero non tempus laoreet, ligula libero cursus sem, et vulputate nisi magna ac purus. Vestibulum id dolor volutpat, pellentesque metus sit amet, rhoncus justo.</p>
                        <p>Morbi sem dolor, sagittis sed dictum vel, accumsan cursus mauris. Vestibulum eu magna id dolor elementum tempus non vitae tortor.</p>
                        <p>In interdum sem pulvinar velit pretium, vel laoreet lacus rhoncus. Duis vitae consectetur leo. Aenean dignissim ac leo sit amet tristique. Praesent in felis ac augue tincidunt condimentum. Etiam pharetra commodo odio vel facilisis. Ut lacus ex, ullamcorper sit amet tristique quis, vehicula a leo. Morbi at neque a magna semper sagittis tincidunt a mauris. Vestibulum risus lacus, pharetra a libero et, efficitur convallis libero.</p>
                    </div>

                    <div className="tag-wrapper">
                        <LocalOfferOutlinedIcon/> 
                        <p className='tag-name'>Tags</p>
                        <p className='tags'>React</p>
                        <p className='tags'>Hooks</p>
                        <p className='tags'>JavaScript</p>
                    </div>

                    <div className="share-wrapper">
                        <ul className='list list-inline mb-0 d-flex align-items-center'>
                            <li className='list-inline-item '>share :</li>
                            <li className='list-inline-item '><i className="fa-brands fa-facebook-f"></i></li>
                            <li className='list-inline-item '><i className="fa-brands fa-whatsapp"></i></li>
                            <li className='list-inline-item '><i className="fa-brands fa-twitter"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
