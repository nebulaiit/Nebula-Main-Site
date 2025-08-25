import React, { useEffect, useState } from 'react';
import './header.css';
import logo from "../Images/Logo/Logo.svg";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton } from '@mui/material';
// import profile from "../Images/profile-icon.jpg";
// import ClickAwayListener from '@mui/material/ClickAwayListener';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useSelector } from 'react-redux';
import NewIcon from '@mui/icons-material/NewspaperOutlined';
import ForumIcon from '@mui/icons-material/ForumOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';

export default function Header({ variant = "default" }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false); // FIXED
    const navigate = useNavigate();
    const location = useLocation();
    const darkMode = useSelector((state) => state.darkMode.enabled);
    const user = useSelector((state) => state.user.user);

    const hideElement = ["/login"].includes(location.pathname);

    // const handleClickAway = () => {
    //     setMenuOpen(false);
    // };

    // const handleDashboardClick = (section) => {
    //     navigate(`/learning-dashboard?section=${section}`);
    //     setMenuOpen(false);
    // };

    const handleLogoClick = () => {
        navigate("/");
    };

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('header');
            if (window.scrollY > 0) {
                header.classList.add('glassmorphism-navbar');
            } else {
                header.classList.remove('glassmorphism-navbar');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
        console.log('User clicked WhatsApp contact button');

        const phone = '918788763679';

        const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
        const email = user?.email ?? '';

        const preFilledMessage = `Hi QubitronX Team, I'm ${fullName} (${email}). I'd like to know more about your courses.`;
        const encodedMessage = encodeURIComponent(preFilledMessage);

        const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

        const newWindow = window.open(whatsappURL, '_blank');

        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            alert('It seems WhatsApp is not installed or pop-ups are blocked. Please contact us directly at 8788763679.');
        }
    };

    return (
        <div>
            {variant === "default" && !hideElement && (
                <div className={`header container-fluid ${darkMode ? 'dark' : ''}`} id='header'>
                    <div className="images-wrapper" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <img src={logo} alt="Logo" />
                    </div>


                    {/* Desktop Navigation Menu */}
                    <nav className="d-none d-md-block ">
                        <ul className='list list-inline my-0 d-flex align-items-center'>

                            <li><Button onClick={() => navigate("/tutorial")}>Tutorial</Button></li>
                            {/* <li><Button onClick={() => navigate("/course-list")}>Course</Button></li> */}
                            <li><Button onClick={() => navigate("/career")}>Career</Button></li>
                            <li><Button onClick={() => navigate("/blog")}>Blog</Button></li>
                            <li><Button onClick={() => navigate("/community")}>Community</Button></li>
                        </ul>
                    </nav>


                    <ul className='right-end-btn list list-inline my-0 me-5 d-none d-md-flex align-items-center'>
                        <li className='list-inline-item'>
                            <Link to="/contact">
                                <Button className='phone-btn'>
                                    <LocalPhoneIcon />
                                </Button>
                            </Link>
                        </li>
                        <li className='list-inline-item'>
                            <Button className='pro-btn' onClick={() => navigate("/login")} disableElevation>
                                Log In
                            </Button>
                        </li>
                        {/* <li className='list-inline-item ms-1'>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div className="profile-dropdown">
                                    <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
                                        <img src={profile} alt="User" className="profile-img" />
                                    </button>

                                    {menuOpen && (
                                        <div className="dropdown-menu show glassmorphism">
                                            <div className="user-info" onClick={() => handleDashboardClick("dashboard")} style={{ cursor: 'pointer' }}>
                                                <img src={profile} className="user-img" alt="profile" />
                                                <div>
                                                    <h6 className="mb-0">{user?.firstName || "Guest User"}</h6>
                                                    <p className="email mb-0">{user?.email || "guest@example.com"}</p>
                                                </div>
                                            </div>

                                            <button className="dropdown-item" onClick={() => handleDashboardClick("dashboard")}>Dashboard</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("lists")}>My Learning</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("wishlist")}>Wishlist</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("All Courses")}>All Courses</button>

                                            {!isLoggedIn ? (
                                                <button className="dropdown-item" onClick={() => { navigate("/login"); setIsLoggedIn(true); }}>
                                                    <ExitToAppOutlinedIcon className="me-2" /> Login
                                                </button>
                                            ) : (
                                                <button className="dropdown-item" onClick={() => {
                                                    localStorage.clear();
                                                    setIsLoggedIn(false);
                                                   
                                                    navigate("/login");
                                                }}>
                                                    <ExitToAppOutlinedIcon className="me-2" /> Logout
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ClickAwayListener>
                        </li> */}

                    </ul>


                    <div className='d-md-none mobile-menu-icon'>
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon fontSize="large" classList="menu-icon" />
                        </IconButton>
                    </div>

                    {/* Optional Drawer for Mobile (implement this if needed) */}
                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <div style={{ width: 250, padding: 20 }} className="mobile-drawer ">
                            <div className="drawer-header">
                                <div >
                                    <img src={logo} alt="Logo" />
                                </div>
                                {/* <div>
                                    <button className="profile-btn" onClick={() => { handleDashboardClick("dashboard"), setDrawerOpen(false) }}>
                                        <img src={profile} alt="User" className="profile-img" />
                                    </button>
                                </div> */}
                            </div>

                            <div className="drawer-body">
                                <ul className='list list-inline my-0'>
                                    <li>
                                        <NewIcon />
                                        <Button onClick={() => { navigate("/tutorial"), setDrawerOpen(false) }}>Tutorial</Button>
                                    </li>
                                    {/* <li><MenuBookIcon /><Button onClick={() => { navigate("/course-list"), setDrawerOpen(false) }}>Course</Button></li> */}
                                    <li><SchoolIcon /><Button onClick={() => { navigate("/career"), setDrawerOpen(false) }}>Career</Button></li>
                                    <li><DescriptionIcon /><Button onClick={() => { navigate("/blog"), setDrawerOpen(false) }}>Blog</Button></li>
                                    <li><ForumIcon /><Button onClick={() => { navigate("/community"), setDrawerOpen(false) }}>Community</Button></li>
                                </ul>
                                <div className="drawer-footer">
                                    <div className="footer-btn">
                                        <Button onClick={() => { navigate("/contact"), setDrawerOpen(false) }}> <LocalPhoneIcon /> Contact Us</Button>
                                        {!isLoggedIn ? (
                                            <button className="dropdown-item" onClick={() => { navigate("/login"); }}>
                                                <ExitToAppOutlinedIcon className="me-2" /> Login
                                            </button>
                                        ) : (
                                            <button className="dropdown-item" onClick={() => {
                                                localStorage.clear();
                                                setIsLoggedIn(false);

                                                navigate("/login");
                                            }}>
                                                <ExitToAppOutlinedIcon className="me-2" /> Logout
                                            </button>
                                        )}
                                    </div>

                                    <div className="social-logo">
                                        <p className="mb-4 reach-us">Reach Us Out</p>
                                        <Button onClick={handleWhatsAppClick}><i className="fa-brands fa-whatsapp"></i></Button>
                                        <Button><i className="fa-brands fa-instagram"></i></Button>
                                        <Button><i className="fa-brands fa-linkedin"></i></Button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Drawer>
                </div>
            )}
        </div>
    );
}