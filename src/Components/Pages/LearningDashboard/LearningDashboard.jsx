import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LearningDashboard.css";
import pythonImg from './python.jpeg';
import reactImg from './react.jpg';
import paymentVideo from './paymentpage.mp4';
import contentVideo from './contentpage.mp4';


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
      image: reactImg,
    },
    {
      id: 2,
      title: "Intro to Python",
      description: "Perfect course for beginners to learn Python.",
      instructor: "Jane Smith",
      duration: "8 hours",
      level: "Beginner",
      image: pythonImg,
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
      price: 449,
      duration: "4 weeks",
      image: pythonImg,
    },
    {
      id: 102,
      title: "React Development",
      price: 799,
      duration: "5 weeks",
      image: reactImg,
    },
  ];

  const handleProceedToCheckout = (course) => {
    navigate("/PaymentPage", { state: { course } });
  };

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

  const handleAddToCart = (course) => {
    const isAlreadyInCart = cart.some((c) => c.id === course.id);
    if (isAlreadyInCart) {
      alert("This course is already in your cart!");
      return;
    }

    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
  const handleRemoveFromWishlist = (courseId) => {
    const updatedWishlist = wishlist.filter((c) => c.id !== courseId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleMoveToCart = (course) => {
    handleAddToCart(course);
    handleRemoveFromWishlist(course.id);
  };

 const handleStartLearning = (courseId) => {
  navigate("/courses", { state: { courseId }});
 }



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
                  <button className="enroll-btn" onClick={() => handleAddToCart(course)}>Enroll</button>
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
                      <button className="btn-remove" onClick={() => handleRemoveFromWishlist(course.id)}>Remove</button>
                      <button className="btn-move" onClick={() => handleMoveToCart(course)}>Move to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="dashboard-container">
            <h2 className="tab-title">🎓 Your Learning Dashboard</h2>
            <p className="tab-desc">Track your progress, resume courses, and celebrate your achievements.</p>

            {/* Learning Stats */}
            <div className="dashboard-section stats-overview">
              <h3>📊 Learning Overview</h3>
              <div className="stats-cards">
                <div className="stat-card">
                  <h4>{learningStats.totalCourses}</h4>
                  <p>Total Courses</p>
                </div>
                <div className="stat-card">
                  <h4>{learningStats.completed}</h4>
                  <p>Completed</p>
                </div>
                <div className="stat-card">
                  <h4>{learningStats.inProgress}</h4>
                  <p>In Progress</p>
                </div>
              </div>
            </div>
            {/* Purchased Courses */}
            <div className="dashboard-section">
              <h3>🛒 Your Purchased Courses</h3>
              {purchasedCourses.length === 0 ? (
                <p>You haven't purchased any courses yet.</p>
              ) : (
                <div className="course-list">
                  {purchasedCourses.map((course, index) => (
                    <div key={`${course.id}-${index}`} className="course-card">

                      {/* Course Image */}
                      <img
                        src={course.image} // Make sure 'image' URL exists in course object
                        alt={course.title}
                        className="course-image"
                      />

                      {/* Course Info */}
                      <div className="course-info">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <small>Duration: {course.duration}</small>
                        <br />
                        <small>
                          Purchased on: {new Date(course.purchaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </small>

                        {/* Progress Bar */}
                        <div className="progress-wrapper">
                          <div className="progress-bar">
                            <div
                              className="progress"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span>{course.progress}% completed</span>
                        </div>

                        {/* Start Learning Button */}
                        <button
                          className="start-learning-btn-dash"
                          onClick={() => handleStartLearning(course.id)}
                        >
                          Start Learning
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* Current Learning Progress */}
            <div className="dashboard-section">
              <h3>📚 Currently Learning</h3>
              <div className="learning-grid">
                {currentLearning.map((course, index) => (
                  <div key={`${course.id}-${index}`} className="learning-card">

                    <div className="card-header">
                      <strong>{course.title}</strong>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span>{course.progress}% completed</span>
                    </div>
                    <button className="resume-btn">Resume Course</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="dashboard-section">
              <h3>🏅 Achievements</h3>
              <div className="achievements-grid">
                {achievements.map((badge, index) => (
                  <div key={`${badge.id}-${index}`} className="badge-card">

                    <div className="badge-icon">🏆</div>
                    <div>
                      <strong>{badge.title}</strong>
                      <p><em>{badge.date}</em></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
 case "cart":
  return (
    <div className="cart-section">
      <h2 className="tab-title">Your Cart</h2>
      <p className="tab-desc">These are the courses you've added to your cart.</p>
      <div className="cart-grid">
        {cartCourses.map((course) => (
          <div className="cart-card" key={course.id}>
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <div className="course-actions">
                <button
                  className="btn-checkout"
                  onClick={() => handleProceedToCheckout(course)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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