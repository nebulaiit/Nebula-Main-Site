import React, { useEffect, useState } from 'react';
import './header.css';
import logo from "../../Images/Logo/Logo.svg";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import profile from "../../Images/profile-icon.jpg";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Dropmenu from './Dropmenu';
import { getAllTutorial } from '../../APIService/apiservice';

export default function Header({ variant = "default" }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false); // FIXED
    const navigate = useNavigate();
    const location = useLocation();

    const hideElement = ["/login"].includes(location.pathname);

    const toggleDropdown = (menu) => {
        setOpenDropdown(prev => (prev === menu ? null : menu));
    };

    const closeDropdown = () => {
        setOpenDropdown(null);
    };

    const handleClickAway = () => {
        setMenuOpen(false);
    };

    const handleDashboardClick = (section) => {
        navigate(`/learning-dashboard?section=${section}`);
        setMenuOpen(false);
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchTutorialList = async () => {
            try {
                const response = await getAllTutorial();
                setCourses(response);
            } catch (error) {
                console.error("Error fetching tutorials:", error);
            }
        };
        fetchTutorialList();

        // Optional: Load user info from localStorage if available
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser) {
            setIsLoggedIn(true);
            setUserInfo(storedUser);
        }
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header.classList.add('glassmorphism');
            } else {
                header.classList.remove('glassmorphism');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {variant === "default" && !hideElement && (
                <div className='header d-flex justify-content-between align-items-center container-fluid'>
                    <div className="images-wrapper" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className="search-box d-none d-md-block">
                        <span><SearchIcon /></span>
                        <input type="text" placeholder='Search Tutorial & Examples' />
                    </div>

                    {/* Desktop Navigation Menu */}
                    <nav className="d-none d-md-block">
                        <ul className='list list-inline mb-0 d-flex align-items-center'>
                            {["tutorial", "examples", "courses", "career"].map(menu => (
                                <li key={menu} className='list-inline-item position-relative'>
                                    <Button onClick={() => toggleDropdown(menu)}>
                                        {menu.charAt(0).toUpperCase() + menu.slice(1)}
                                        <ExpandMoreIcon className='ms-2' />
                                    </Button>
                                    {openDropdown === menu && (
                                        <Dropmenu
                                            closeDropdown={closeDropdown}
                                            activeMenu={menu}
                                        />
                                    )}
                                </li>
                            ))}
                            <li><Button onClick={()=>navigate("/blog")}>Blog</Button></li>
                        </ul>
                    </nav>

                    {/* Right-end Buttons */}
                    <ul className='right-end-btn list list-inline mb-0 d-none d-md-flex align-items-center'>
                        <li className='list-inline-item'>
                            <Link to="/contact">
                                <Button className='phone-btn'>
                                    <LocalPhoneIcon />
                                </Button>
                            </Link>
                        </li>
                        <li className='list-inline-item'>
                            <Button className='pro-btn' onClick={() => navigate("/login")} disableElevation>
                                UPGRADE TO PRO
                            </Button>
                        </li>
                        <li className='list-inline-item ms-1'>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div className="profile-dropdown">
                                    <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
                                        <img src={profile} alt="User" className="profile-img mt-1" />
                                    </button>

                                    {menuOpen && (
                                        <div className="dropdown-menu show">
                                            <div className="user-info" onClick={() => handleDashboardClick("dashboard")} style={{ cursor: 'pointer' }}>
                                                <img src={profile} className="user-img" alt="profile" />
                                                <div>
                                                    <h6 className="mb-0">{userInfo?.name || "Guest User"}</h6>
                                                    <p className="email mb-0">{userInfo?.email || "guest@example.com"}</p>
                                                </div>
                                            </div>

                                            <button className="dropdown-item" onClick={() => handleDashboardClick("dashboard")}>Dashboard</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("lists")}>My Learning</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("wishlist")}>Wishlist</button>
                                            <button className="dropdown-item" onClick={() => handleDashboardClick("All Courses")}>All Courses</button>

                                            {!isLoggedIn ? (
                                                <button className="dropdown-item" onClick={() => navigate("/login")}>
                                                    <ExitToAppOutlinedIcon className="me-2" /> Login
                                                </button>
                                            ) : (
                                                <button className="dropdown-item" onClick={() => {
                                                    localStorage.clear();
                                                    setIsLoggedIn(false);
                                                    setUserInfo(null);
                                                    navigate("/");
                                                }}>
                                                    <ExitToAppOutlinedIcon className="me-2" /> Logout
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ClickAwayListener>
                        </li>
                        
                    </ul>

                    {/* Hamburger for Mobile */}
                    <div className='d-md-none'>
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </div>

                    {/* Optional Drawer for Mobile (implement this if needed) */}
                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <div style={{ width: 250, padding: 20 }}>
                            <p>Mobile menu here</p>
                            {/* Add mobile navigation logic here if required */}
                        </div>
                    </Drawer>
                </div>
            )}
        </div>
    );
}