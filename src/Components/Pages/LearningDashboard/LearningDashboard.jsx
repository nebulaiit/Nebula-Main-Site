 import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LearningDashboard.css";


const tabs = [
  { key: "all", label: "All Courses" },
  { key: "lists", label: "My Lists" },
  { key: "wishlist", label: "Wishlist" },
  { key: "dashboard", label: "Dashboard" },
  { key: "cart", label: "Your Cart" },
];

const myCourseLists = [
  {
    id: 1,
    title: "Web Development Essentials",
    description: "Start your journey into frontend and backend development using HTML, CSS, JavaScript, and Node.js.",
    courseCount: 7,
  },
  {
    id: 2,
    title: "Data Science Path",
    description: "A handpicked collection for mastering data analysis, Python, statistics, and machine learning.",
    courseCount: 5,
  },
  {
    id: 3,
    title: "Interview Preparation",
    description: "Sharpen your problem-solving skills with DSA and system design to crack coding interviews.",
    courseCount: 6,
  },
  {
    id: 4,
    title: "Python for Beginners",
    description: "Courses specially designed for absolute beginners to learn Python fundamentals and basic projects.",
    courseCount: 4,
  },
  {
    id: 5,
    title: "Full Stack Developer Track",
    description: "Covers both frontend and backend tools, including React, Express, MongoDB, and APIs.",
    courseCount: 8,
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    description: "Get started with neural networks, deep learning, and AI algorithms using TensorFlow and PyTorch.",
    courseCount: 6,
  },
];

const learningStats = {
  totalCourses: 12,
  completed: 5,
  inProgress: 4,
};

const currentLearning = [
  {
    id: 1,
    title: "React for Beginners",
    progress: 60,
  },
  {
    id: 2,
    title: "Python Fundamentals",
    progress: 40,
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    progress: 20,
  },
];

const achievements = [
  {
    id: 1,
    title: "Python Beginner Badge",
    date: "Mar 2025",
  },
  {
    id: 2,
    title: "100 Days of Code Streak",
    date: "Feb 2025",
  },
];

const LearningDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const loadWishlistCart = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  };
  const wishlistCourses = [
    {
      id: 1,
      title: "Mastering JavaScript",
      description: "Deep dive into modern JavaScript ES6+ features.",
      instructor: "John Doe",
      duration: "12 hours",
      level: "Intermediate",
      image: "https://www.python.org/static/community_logos/python-logo.png",
    },
    {
      id: 2,
      title: "Intro to Python",
      description: "Perfect course for beginners to learn Python.",
      instructor: "Jane Smith",
      duration: "8 hours",
      level: "Beginner",
      image:  "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
    },

  ];

  const allCourses = [
    {
      id: 1,
      title: "Python for Beginners",
      description: "Learn Python from scratch and build your first app.",
      duration: "4 weeks",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      description: "Understand JS fundamentals and start creating dynamic websites.",
      duration: "3 weeks",
    },
    {
      id: 3,
      title: "React Development",
      description: "Build interactive UIs using React.js.",
      duration: "5 weeks",
    },
    {
      id: 4,
      title: "Intro to Machine Learning",
      description: "Dive into ML concepts and implement simple models.",
      duration: "6 weeks",
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      description: "Master DSA to ace technical interviews.",
      duration: "6 weeks",
    },
  ];

  const cartCourses = [
    {
      id: 101,
      title: "Python for Beginners",
      price: 49,
      duration: "4 weeks",
    },
    {
      id: 102,
      title: "React Development",
      price: 59,
      duration: "5 weeks",
    },
  ];

  useEffect(() => {
    loadWishlistCart();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "wishlist" || e.key === "cart") {
        loadWishlistCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section && tabs.some((tab) => tab.key === section)) {
      setActiveTab(section);
    } else {
      setActiveTab("all");
    }
  }, [location]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/learning-dashboard?section=${tabKey}`);
    loadWishlistCart();
  };

 
  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return (
          <div>
            <h2 className="tab-title">All Courses</h2>
            <p className="tab-desc">Explore your available courses here.</p>
            <div className="course-list">
              {allCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <small>Duration: {course.duration}</small>
                  <button className="enroll-btn">Enroll</button>
                </div>
              ))}
            </div>
          </div>
        );

      case "lists":
        return (
          <div>
            <h2 className="tab-title">My Lists</h2>
            <p className="tab-desc">Your saved course collections appear here.</p>
            <div className="my-lists">
              {myCourseLists.map((list) => (
                <div className="list-card" key={list.id}>
                  <h3>{list.title}</h3>
                  <p>{list.description}</p>
                  <p><strong>{list.courseCount}</strong> courses</p>
                  <div className="list-actions">
                    <button className="btn-view">View List</button>
                    <button className="btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div>
            <h2 className="tab-title">Wishlist</h2>
            <p className="tab-desc">Courses you've added to your wishlist.</p>
            <div className="course-list">
              {wishlistCourses.map((course) => (
                <div className="course-card" key={course.id}>
                  <img src={course.image} alt={course.title} className="course-image" />
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Level:</strong> {course.level}</p>
                    <div className="course-actions">
                      <button className="btn-remove">Remove</button>
                      <button className="btn-move">Move to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div>
            <h2 className="tab-title">Dashboard</h2>
            <p className="tab-desc">Track your learning progress here.</p>

            <div className="dashboard-section">
              <h3>📊 Learning Stats</h3>
              <ul className="stats-list">
                <li>Total Courses: {learningStats.totalCourses}</li>
                <li>Completed: {learningStats.completed}</li>
                <li>In Progress: {learningStats.inProgress}</li>
              </ul>
            </div>

            <div className="dashboard-section">
              <h3>📚 Current Learning</h3>
              {currentLearning.map((course) => (
                <div key={course.id} className="learning-card">
                  <p><strong>{course.title}</strong></p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <small>{course.progress}% completed</small>
                </div>
              ))}
            </div>

            <div className="dashboard-section">
              <h3>🏅 Achievements</h3>
              <ul className="achievements-list">
                {achievements.map((badge) => (
                  <li key={badge.id}>
                    <strong>{badge.title}</strong> – <em>{badge.date}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "cart":
        return (
          <div>
            <h2 className="tab-title">Your Cart</h2>
            <p className="tab-desc">Courses you’ve added to your cart for purchase.</p>
            <div className="course-list cart-view">
              {cartCourses.length > 0 ? (
                cartCourses.map((item) => (
                  <div className="course-card cart-card" key={item.id}>
                    <img
                      src={`https://via.placeholder.com/120x80?text=${item.title.split(" ")[0]}`}
                      alt={item.title}
                      className="cart-course-image"
                    />
                    <div className="cart-course-info">
                      <h3>{item.title}</h3>
                      <p>Duration: {item.duration}</p>
                      <p className="course-price">₹{item.price}</p>
                      <button className="btn-remove">Remove</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-cart-msg">Your cart is empty. Start exploring courses!</p>
              )}
            </div>

            {cartCourses.length > 0 && (
              <div className="cart-summary">
                <h3>Total: ₹{cartCourses.reduce((acc, curr) => acc + curr.price, 0)}</h3>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        );
        default:
        return null;
    }
  };

  return (
    <div className="learning-dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <h1>📚 My Learning</h1>
        </div>
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="content-box">{renderTabContent()}</div>
      </main>
    </div>
  );
};

export default LearningDashboard;
