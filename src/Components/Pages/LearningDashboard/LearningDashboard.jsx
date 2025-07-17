import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LearningDashboard.css";
import AllCourses from "./AllCourses";
import Wishlist from "./Wishlist";
import Dashboard from "./Dashboard";
import MyLists from './MyLists'
import Cart from "./Cart";


const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "all", label: "All Courses" },
  { key: "lists", label: "My Lists" },
  { key: "wishlist", label: "Wishlist" },
  { key: "cart", label: "Your Cart" },
];

const LearningDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    setActiveTab(tabs.some((tab) => tab.key === section) ? section : "all");
  }, [location]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/learning-dashboard?section=${tabKey}`);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "all":
        return <AllCourses />;
      // case "lists":
      //   return <MyLists />;
      case "wishlist":
        return <Wishlist />;
      case "cart":
        return <Cart />;
      default:
        return <AllCourses />;
    }
  };

  return (
    <div className="learning-dashboard">
      <header className="dashboard-header">
        <h1>📚 My Learning</h1>
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

      <main className="dashboard-main ">
        <div className="content-box glassmorphism">{renderTab()}</div>
      </main>
    </div>
  );
};

export default LearningDashboard;
