import React, { useState, useEffect } from "react";
import { Dropdown, Modal, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import save job icons
import moment from "moment"; // For calculating posting days
import {  InputGroup } from "react-bootstrap";
import { FaMapMarkerAlt, FaBriefcase, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JobListingDashboard.css";
import { Form } from "react-bootstrap";
import { Carousel } from "react-bootstrap"; // ✅ Import Bootstrap Carousel
import bannerImg1 from "../Assets/carousel-2.jpg";
import bannerImg2 from "../Assets/carousel-1.jpg";
import bannerImg3 from "../Assets/homebg1.jpg";
import { useNavigate } from "react-router-dom";

const JobListingDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
    const [savedJobs, setSavedJobs] = useState(new Set());
    const [showEnquiry, setShowEnquiry] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  
  // Dummy job listings
const dummyJobs = [
  {
    id: "dummy-1",
    title: "Software Developer",
    company: "Tech Corp",
    location: "New York, USA",
    jobType: "Full-Time",
    jobMode: "Remote",
    status: "Open",
    salary: "$80,000 - $100,000",
    skills: ["JavaScript", "React", "Node.js"],
    postedDate: "3 days ago",
    description: "Exciting opportunity for a Software Developer to join our growing team..."
  },
  {
    id: "dummy-2",
    title: "Data Analyst",
    company: "Data Insights Ltd",
    location: "San Francisco, USA",
    jobType: "Part-Time",
    jobMode: "Hybrid",
    status: "Open",
    salary: "$60,000 - $75,000",
    skills: ["SQL", "Python", "Tableau"],
    postedDate: "1 week ago",
    description: "Looking for a Data Analyst to work with a fast-paced team..."
  },
  {
    id: "dummy-3",
    title: "UI/UX Designer",
    company: "Creative Solutions",
    location: "Los Angeles, USA",
    jobType: "Contract",
    jobMode: "On-Site",
    status: "Hiring Soon",
    salary: "$50,000 - $70,000",
    skills: ["Figma", "Adobe XD", "UX Research"],
    postedDate: "2 weeks ago",
    description: "We need a UI/UX Designer to create stunning interfaces..."
  },
  {
    id: "dummy-4",
    title: "Cybersecurity Engineer",
    company: "SecureTech Inc",
    location: "Austin, USA",
    jobType: "Full-Time",
    jobMode: "Remote",
    status: "Open",
    salary: "$90,000 - $120,000",
    skills: ["Cybersecurity", "Network Security", "Python"],
    postedDate: "5 days ago",
    description: "Join our team to secure enterprise-level systems and networks..."
  },
  {
    id: "dummy-5",
    title: "Digital Marketing Specialist",
    company: "MarketGenius",
    location: "Chicago, USA",
    jobType: "Internship",
    jobMode: "Hybrid",
    status: "Open",
    salary: "Stipend: $1,000/month",
    skills: ["SEO", "Google Ads", "Social Media Marketing"],
    postedDate: "4 days ago",
    description: "Exciting opportunity for a Digital Marketing Specialist to handle campaigns..."
  }
];

  // Search & Filter State
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  
  // 🔹 Filter Jobs Based on Search & Selection
  // const filterJobs = () => {
  //   let filtered = jobs.filter(job =>
  //     job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
  //     job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
  //     (selectedJobType ? job.jobType === selectedJobType : true)
  //   );
  //   setFilteredJobs(filtered);
  // }; 


  // 🔹 Function to filter jobs
const filterJobs = () => {
  let sourceJobs = jobs.length > 0 ? jobs : dummyJobs; // Use API jobs if available, else use dummy jobs

  let filtered = sourceJobs.filter(job =>
    job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
    (selectedJobType ? job.jobType === selectedJobType : true)
  );
  setFilteredJobs(filtered);
};

  // 🔹 Function to Filter Jobs Dynamically
useEffect(() => {
  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
    (selectedJobType ? job.jobType === selectedJobType : true)
  );
  setFilteredJobs(filtered);
}, [searchTitle, searchLocation, selectedJobType, jobs]); // Runs when any of these change


  // 🔹 Automatically filter jobs when search inputs change
useEffect(() => {
  filterJobs();
}, [searchTitle, searchLocation, selectedJobType]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setUserProfile(storedProfile);
    }
  }, []);



  // 🔹 Fetch jobs from backend
useEffect(() => {
  axios.get("http://localhost:9091/api/jobs")
    .then(response => {
      setJobs(response.data);
      setFilteredJobs(response.data.length > 0 ? response.data : dummyJobs); // Show dummy jobs if API returns empty
    })
    .catch(error => {
      console.error("Error fetching jobs:", error);
      setFilteredJobs(dummyJobs); // If API fails, use dummy jobs
    });
}, []);


  // Detect scrolling for navbar transparency effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle Logout with Confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken"); // Clear JWT
      sessionStorage.clear(); // Clear session storage
      setTimeout(() => navigate("/login"), 500); // Smooth logout transition
    }
  };

  // Toggle Save Job
  const toggleSaveJob = (jobId) => {
    setSavedJobs((prevSaved) => {
      const newSaved = new Set(prevSaved);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  // Detect scrolling for navbar transparency effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="dashboard-container ">
      
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Left Side: Logo and Portal Name */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="portal-name">DAG Job Portal</span>
        </div>
      </div>

        <Dropdown>
          <Dropdown.Toggle variant="light" id="profile-dropdown">
            <img
              src={userProfile?.profilePic || "/default-profile.png"}
              alt="Profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="/job-seeker-dashboard">My Profile</Dropdown.Item>
            <Dropdown.Item href="/applied-jobs">Applied Jobs</Dropdown.Item>
            <Dropdown.Item href="/saved-jobs">Saved Jobs</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setShowEnquiry(true)}>
              Enquiry/Help
            </Dropdown.Item>
            <Dropdown.Item href="/contact-us">Contact Us</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/login" onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </nav>
        


      {/* Banner Carousel (Bootstrap) */}
            <div className="banner-section">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" style={{height:"500px", width: "100%" , objectFit:"cover"}} src={bannerImg1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" style={{height:"500px", width: "100%" , objectFit:"cover"}} src={bannerImg2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" style={{height:"500px", width: "100%" , objectFit:"cover"}} src={bannerImg3} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      
        {/* Banner Content */}
        <div className="banner-content">
          <h1>Welcome to DAG Job Portal</h1>
          <p>Your gateway to exciting job opportunities and career growth.</p>
          <div className="banner-buttons">
            <button className="btn btn-success me-2" >Explore Jobs</button>
            <button className="btn btn-outline-light" onClick={() => navigate("/job-seeker-dashboard")}>
      Upload Resume
    </button>
          </div>
        </div>
      </div>


        {/* Hero Section */}
    <div className="hero-section text-center py-5 px-5">
      <h1>Find Your Dream Job Here</h1>
      <p>A thoughtful combination of design and function to support your career growth.</p>

      {/* Search Filters */}
      <div className="container mt-4" style={{ border: "1px dotted black" }}>
        <div className="row justify-content-center align-items-center g-2">
          
          {/* Job Title Input */}
          <div className="col-md-3">
            <InputGroup className="search-input">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Job Title (e.g. Software Engineer)"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </InputGroup>
          </div>

          {/* Location Input */}
          <div className="col-md-3">
            <InputGroup className="search-input">
              <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </InputGroup>
          </div>

          {/* Job Type Dropdown */}
          <div className="col-md-3">
            <InputGroup className="search-input">
              <InputGroup.Text><FaBriefcase /></InputGroup.Text>
              <Dropdown onSelect={(jobType) => setSelectedJobType(jobType)}>
                <Dropdown.Toggle variant="light" id="jobTypeDropdown" style={{ marginBottom: "15px", border: "0.01px solid black" }}>
                  {selectedJobType || "Select Job Type"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Full-time">Full-time</Dropdown.Item>
                  <Dropdown.Item eventKey="Part-time">Part-time</Dropdown.Item>
                  <Dropdown.Item eventKey="Internship">Internship</Dropdown.Item>
                  <Dropdown.Item eventKey="Contract">Contract</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </div>

           {/* 🔍 Search Button */}
        <div className="col-md-2">
          <Button variant="success" className="w-100" onClick={filterJobs}>Search</Button>
        </div>

        </div>
      </div>
    </div>

      {/* 🔹 Job Listings Section */}
    <div className="popular-search-section mt-5">
      <h3 className="text-center">Popular Search</h3>
      <div className="d-flex justify-content-center gap-4 m-5">
        <div className="job-list mt-4">
          {filteredJobs.length > 0 ? (
            <div className="row">
              {filteredJobs.map((job) => (
                <div key={job.id} className="col-md-4 mb-4">
                  <Card className="job-card">
                    <Card.Body>
                      <div className="save-icon" onClick={() => toggleSaveJob(job.id)}>
                        {savedJobs.has(job.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                      </div>

                      <h5 className="job-title">{job.title}</h5>
                      <p className="job-company">{job.companyName}</p>
                      <p className="job-location">📍 {job.location}</p>
                      <p className="job-info">
                        <strong>Type:</strong> {job.jobType} | 
                        <strong> Mode:</strong> {job.jobMode} |
                        <strong> Status:</strong> {job.status}
                      </p>
                      <p className="job-salary">💰 Salary: {job.salary || "Not Disclosed"}</p>
                      <p className="job-skills">
                        <strong>Skills:</strong> {job.skills ? job.skills.join(", ") : "N/A"}
                      </p>
                      <p className="job-posted">🕒 Posted {moment(job.postedDate).fromNow()}</p>
                      <p className="job-description">{job.description.slice(0, 100)}...</p>
                      <Button variant="primary">Apply Now</Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
        // Dummy Job Listings when no jobs are available

            

<div className="row">
  {[
    {
      title: "Software Developer",
      company: "Tech Corp",
      location: "📍 New York, USA",
      type: "Full-Time",
      mode: "Remote",
      status: "Open",
      salary: "$80,000 - $100,000",
      skills: "JavaScript, React, Node.js",
      posted: "🕒 Posted 3 days ago",
      description: "Exciting opportunity for a Software Developer to join our growing team..."
    },
    {
      title: "Data Analyst",
      company: "Data Insights Ltd",
      location: "📍 San Francisco, USA",
      type: "Part-Time",
      mode: "Hybrid",
      status: "Open",
      salary: "$60,000 - $75,000",
      skills: "SQL, Python, Tableau",
      posted: "🕒 Posted 1 week ago",
      description: "Looking for a Data Analyst to work with a fast-paced team..."
    },
    {
      title: "UI/UX Designer",
      company: "Creative Solutions",
      location: "📍 Los Angeles, USA",
      type: "Contract",
      mode: "On-Site",
      status: "Hiring Soon",
      salary: "$50,000 - $70,000",
      skills: "Figma, Adobe XD, UX Research",
      posted: "🕒 Posted 2 weeks ago",
      description: "We need a UI/UX Designer to create stunning interfaces..."
    },
    {
      title: "Cybersecurity Engineer",
      company: "SecureTech Inc",
      location: "📍 Austin, USA",
      type: "Full-Time",
      mode: "Remote",
      status: "Open",
      salary: "$90,000 - $120,000",
      skills: "Cybersecurity, Network Security, Python",
      posted: "🕒 Posted 5 days ago",
      description: "Join our team to secure enterprise-level systems and networks..."
    },
    {
      title: "Digital Marketing Specialist",
      company: "MarketGenius",
      location: "📍 Chicago, USA",
      type: "Internship",
      mode: "Hybrid",
      status: "Open",
      salary: "Stipend: $1,000/month",
      skills: "SEO, Google Ads, Social Media Marketing",
      posted: "🕒 Posted 4 days ago",
      description: "Exciting opportunity for a Digital Marketing Specialist to handle campaigns..."
    }
  ].map((job, index) => (
    <div key={index} className="col-md-4 mb-4"> {/* 3 columns per row */}
      <Card className="job-card">
        <Card.Body>
          {/* Save Job Icon */}
          <div className="save-icon">
            <FaRegHeart />
          </div>

          <h5 className="job-title">{job.title}</h5>
          <p className="job-company">{job.company}</p>
          <p className="job-location">{job.location}</p>

          {/* Job Type, Mode & Status */}
          <p className="job-info">
            <strong>Type:</strong> {job.type} | 
            <strong> Mode:</strong> {job.mode} |
            <strong> Status:</strong> {job.status}
          </p>

          {/* Salary */}
          <p className="job-salary">💰 Salary: {job.salary}</p>

          {/* Skills Required */}
          <p className="job-skills">
            <strong>Skills:</strong> {job.skills}
          </p>

          {/* Posting Days Calculation */}
          <p className="job-posted">{job.posted}</p>

          <p className="job-description">{job.description}</p>
          <Button variant="primary">Apply Now</Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>

      )}
    </div>
  </div>
</div>


      <Modal show={showEnquiry} onHide={() => setShowEnquiry(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Your Message</label>
              <textarea className="form-control" rows="4" placeholder="Write your enquiry here..."></textarea>
            </div>
            <Button variant="primary" onClick={() => setShowEnquiry(false)}>
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobListingDashboard;
