import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JobSeekerDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mainBannerImg from '../Assets/carousel-2.jpg';
import { Carousel } from "react-bootstrap"; // ✅ Import Bootstrap Carousel
import bannerImg1 from "../Assets/carousel-2.jpg";
import bannerImg2 from "../Assets/carousel-1.jpg";
import bannerImg3 from "../Assets/homebg1.jpg";
import { FaGraduationCap, FaTools, FaBriefcase, FaUserCircle, FaFileUpload, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const secondButtonRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(["personalDetails"]);
  const [isScrolled, setIsScrolled] = useState(false);
  const userId = localStorage.getItem("userId");


  const scrollToSecondButton = () => {
    if (secondButtonRef.current) {
      secondButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      navigate("/login");
    }
  }, [userId, navigate]);

  // Personal Details
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");

  // Education
  const [educationList, setEducationList] = useState([{ university: "", degree: "", branch: "", percentage: "", passingYear: "" }]);
  const addEducation = () => setEducationList([...educationList, { university: "", degree: "", branch: "", percentage: "", passingYear: "" }]);
  const removeEducation = (index) => setEducationList(educationList.filter((_, i) => i !== index));

  // Skills
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter" && skillInput.trim() !== "") {
      event.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  // Experience
  const [experiences, setExperiences] = useState([{ company: "", role: "", startDate: "", endDate: "", jobType: "Internship", mode: "Remote" }]);
  const addExperience = () => setExperiences([...experiences, { company: "", role: "", startDate: "", endDate: "", jobType: "Internship", mode: "Remote" }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  // Profile Picture
  const [profilePic, setProfilePic] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
      setProfilePic(reader.result);
      };  
      reader.readAsDataURL(file);
      }    
      };
      
       

      const removeProfilePic = () => {
      setProfilePic(null);
      };

  // upload resume

  const [resume, setResume] = useState(null);

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setResume(file);
  }
};

const removeResume = () => {
  setResume(null);
};

      

  // About Me
  const [aboutMe, setAboutMe] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleAboutMeChange = (event) => {
    const text = event.target.value;
    setAboutMe(text);

    // Count words correctly by removing extra spaces
    const words = text.trim().split(/\s+/).filter(word => word !== "");
    setWordCount(words.length);
  };


  const handleSubmit = async () => {
    console.log("Submitting profile...");
  
    if (!fullName || !mobile || !email || !address || !dob || !gender || !skills.length || !experiences.length || !aboutMe) {
      alert("Please fill in all required fields before submitting.");
      console.warn("Form validation failed! Missing fields detected.");
      return;
    }
  
    const formData = new FormData();
  
    const jobSeekerProfile = {
      fullName,
      mobile,
      email,
      address,
      dateOfBirth: dob,
      gender,
      aboutMe,
      educationList,
      skills,
      experiences,
    };
  
    formData.append(
      "profile",
      new Blob([JSON.stringify(jobSeekerProfile)], { type: "application/json" })
    );
  
    if (profilePic) {
      formData.append("profilePicture", profilePic);
      formData.append("resume", resume);
    }
  
    const token = localStorage.getItem("token"); // ✅ Get token from storage
    const userId = localStorage.getItem("userId"); // ✅ Get userId
  
    try {
      const saveProfileResponse = await axios.post(
        "http://localhost:9091/api/job-seeker/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ Attach token
          },
          withCredentials: true,
        }
      );
  
      if (saveProfileResponse.status === 200) {
        await axios.put(
          `http://localhost:9091/api/users/update-profile-status/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Attach token
            },
            withCredentials: true,
          }
        );
  
        localStorage.setItem("isProfileComplete", "true");
        alert("Profile submitted successfully!");
        navigate("/JobListingDashboard");
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (error) {
      console.error("Failed to submit profile.", error);
      alert("Failed to submit profile. Please try again.");
    }
  };
  
  
  

  

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

  const toggleSection = (section) => {

    if (!visibleSections.includes(section)) {
    
    setVisibleSections([...visibleSections, section]);
    
    }
    
    };

  return (

    <div className="header">

<nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Left Side: Logo and Portal Name */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="portal-name">DAG Job Portal</span>
        </div>
      </div>

      {/* Right Side: Logout Button */}
      <div className="navbar-right">
        <button className="logout-button btn" onClick={handleLogout}>
          Logout <i className="bi bi-box-arrow-right me-2"></i>
        </button>
      </div>
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
      <button className="btn btn-success me-2" onClick={() => navigate("/JobListingDashboard")}>Explore Jobs</button>
      <button className="btn btn-outline-light" onClick={scrollToSecondButton}>
        Upload Resume
      </button>
    </div>
  </div>
</div>



    <div className="job-seeker-dashboard d-flex">
      {/* Sidebar */}
<div className="sidebar d-flex flex-column p-3 text-white">
  <h3 className="mb-4">Fill the Form</h3>
  <button className="btn btn-primary" onClick={() => toggleSection("education")}>
  <FaGraduationCap className="me-2"  /> Education
</button>

<button className="btn btn-primary" onClick={() => toggleSection("skills")}>
  <FaTools className="me-2" /> Skills
</button>

<button className="btn btn-primary" onClick={() => toggleSection("experience")}>
  <FaBriefcase className="me-2" /> Experience
</button>

<button className="btn btn-primary" onClick={() => toggleSection("uploadPic")}>
  <FaUserCircle className="me-2" /> Upload Profile Picture
</button>

<button className="btn btn-primary" onClick={() => toggleSection("uploadResume")}>
  <FaFileUpload className="me-2" /> Upload Resume
</button>

<button className="btn btn-primary" onClick={() => toggleSection("aboutMe")}>
  <FaUser className="me-2" /> About Me
</button>
</div>


      {/* Main Content */}
      <div className="content p-4 w-100 ">
        <h2 className="mb-4">Create Your Profile</h2>

        {/* Personal Details (Always Visible) */}
{visibleSections.includes("personalDetails") && (
  <div className="section" style={{border:"2px dashed black"}}>
    <h4>Personal Details</h4>

    <div className="row-1 d-flex">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-person"></i></span>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Full Name"
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)}
          required 
        />
      </div>

      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-telephone"></i></span>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Mobile Number"
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>
    </div>

    <div className="row-2 d-flex">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
        <input 
          type="email" 
          className="form-control" 
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Address"
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
    </div>

    <div>
    <div className="row-3 d-flex">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-calendar"></i></span>
        <input 
          type="date" 
          className="form-control"
          value={dob} 
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>
    </div>

    <div className="input-group">
      <span className="input-group-text"><i className="bi bi-gender-ambiguous"></i></span>
      <select 
        className="form-control" 
        value={gender} 
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    </div>

    <div className="row-4 d-flex">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Current Location"
          value={address} // Assuming location is the same as address
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
    </div>
  </div>
)}

        <div className="WholeEducation" style={{textAlign:"justify"}}   >
        <button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("education")}> <FaGraduationCap className="me-2" />Education</button>
        {/* Education Section */}
        {visibleSections.includes("education") && (
          <div className="section" style={{border:"1px dashed black"}}>
            <h4>Education</h4>

            {educationList.map((education, index) => (
              <div key={index} className="education-entry">
                <div className="row-1 d-flex">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-building"></i></span>
                    <input type="text" className="form-control" placeholder="College/University Name" />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-book"></i></span>
                    <input type="text" className="form-control" placeholder="Degree" />
                  </div>
                </div>

                <div className="row-2 d-flex">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-diagram-3"></i></span>
                    <input type="text" className="form-control" placeholder="Branch/Specialization" />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-graph-up"></i></span>
                    <input type="text" className="form-control" placeholder="Percentage/CGPA" />
                  </div>
                </div>

                <div className="row-3">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                    <input type="text" className="form-control" placeholder="Passing Year" />
                  </div>
                </div>

                {/* Remove Education Button */}
                {educationList.length > 1 && (
                  <button className="btn btn-danger mt-2" onClick={() => removeEducation(index)}>
                    <i className="bi bi-trash"></i> Remove Education
                  </button>
                )}

                {/* Dashed Separator Line */}
                {index < educationList.length - 1 && <hr className="dashed-line" />}
              </div>
            ))}

            {/* Add Education Button */}
            <button className="btn btn-success mt-2"  onClick={addEducation}>
              <i className="bi bi-plus-circle" style={{textAlign:"center"}}></i> Add Education
            </button>
          </div>
        )}
</div>



        <div className="WholeEducation" style={{textAlign:"left"}}>
        <button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("skills")}> <FaTools className="me-2" />Skills</button>
        {/* Skills Section */}
        {visibleSections.includes("skills") && (
          <div className="section w-100" style={{border:"1px dashed black"}}>
            <h4>Skills</h4>
    
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lightbulb"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
            </div>

            {/* Display Added Skills as Tags */}
            <div className="skill-tags" >
              {skills.map((skill, index) => (
                <span key={index} className="badge m-1" style={{color:"white", backgroundColor:"#008754", fontSize:"16px"}}>
                  {skill} <i className="bi bi-x-circle" onClick={() => removeSkill(index)}></i>
                </span>
              ))}
            </div>
          </div>
        )}
        </div>



        <div className="WholeEducation" style={{textAlign:"left"}}>
        <button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("experience")}> <FaBriefcase className="me-2" /> Experience</button>
        {/* Experience Section */}
        {visibleSections.includes("experience") && (
          <div className="section" style={{border:"1px dashed black"}}>
            <h4>Experience</h4>

            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="row-3 d-flex">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-building"></i>
                    </span>
                      <input type="text" className="form-control" placeholder="Company/Organization Name" value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-briefcase"></i></span>
                    <input type="text" className="form-control" placeholder="Role" value={exp.role} onChange={(e) => updateExperience(index, "role", e.target.value)} />
                  </div>
                </div>

                <div className="row-3 d-flex">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
                    <input type="date" className="form-control" value={exp.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
                    <input type="date" className="form-control" value={exp.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                  </div>
                </div>

                <div className="row-3 d-flex">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-gear"></i></span>
                    <select className="form-control" value={exp.jobType} onChange={(e) => updateExperience(index, "jobType", e.target.value)}>
                      <option>Internship</option>
                      <option>Full-time</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                    <select className="form-control" value={exp.mode} onChange={(e) => updateExperience(index, "mode", e.target.value)}>
                      <option>Remote</option>
                      <option>In-Office</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Remove Experience Button */}
                {index > 0 && (
                  <button className="btn btn-danger mt-2" onClick={() => removeExperience(index)}>
                    <i className="bi bi-trash"></i> Remove Experience
                  </button>
                )}

                {/* Dashed Line Between Experiences */}
                {index !== experiences.length - 1 && <hr className="dashed-line" />}
              </div>
            ))}

            {/* Add Experience Button */}
            <button className="btn btn-success mt-3" onClick={addExperience}>
              <i className="bi bi-plus-circle"></i> Add Experience
            </button>
          </div>
        )}
        </div>




        <div className="WholeEducation" style={{textAlign:"left"}}>
        <button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("uploadPic")}> <FaUserCircle className="me-2" />Upload Profile Picture</button>
        {/* Upload Profile Picture */}
        {visibleSections.includes("uploadPic") && (
          <div className="section text-center" style={{border:"1px dashed black"}}>
            <h4>Upload Profile Picture</h4>

            {/* Profile Image Preview */}
            {profilePic && (
              <div className="mb-3">
                <img src={profilePic} alt="Profile Preview" className="rounded-circle border border-secondary" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
              </div>
            )}

            {/* File Input with Icon */}
            <div className="input-group w-50 mx-auto">
              <span className="input-group-text">
                <i className="bi bi-camera"></i>
              </span>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
            </div>

            {/* Remove Image Button */}
            {profilePic && (
              <button className="btn btn-danger mt-2" onClick={removeProfilePic}>
                <i className="bi bi-trash"></i> Remove Image
              </button>
            )}
          </div>
        )}
        </div>


    <div className="WholeEducation" style={{textAlign:"left"}}>
      <button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("uploadResume")}
        ref={secondButtonRef}> <FaFileUpload className="me-2" />Upload Resume</button>
        {/* Upload Resume */}
{visibleSections.includes("uploadResume") && (
  <div className="section text-center" style={{border:"1px dashed black"}}>
    <h4>Upload Resume</h4>

    {/* Resume Preview (if available) */}
    {resume && (
      <div className="mb-3">
        <p><strong>Uploaded File:</strong> {resume.name}</p>
      </div>
    )}

    {/* File Input with Icon */}
    <div className="input-group w-50 mx-auto">
      <span className="input-group-text">
        <i className="bi bi-file-earmark-text"></i>
      </span>
      <input type="file" className="form-control" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
    </div>

    {/* Remove Resume Button */}
    {resume && (
      <button className="btn btn-danger mt-2" onClick={removeResume}>
        <i className="bi bi-trash"></i> Remove Resume
      </button>
    )}
  </div>
)}
</div>

<div className="WholeEducation" style={{textAlign:"left"}}>
<button className="btn1 btn-success mt-2 mb-3" onClick={() => toggleSection("aboutMe")}> <FaUser className="me-2" />About Me</button>




        {/* About Me Section */}
        {visibleSections.includes("aboutMe") && (
          <div className="section" style={{border:"1px dashed black"}}>
            <h4>About Me</h4>

            {/* Textarea with Icon */}
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-lines-fill"></i>
              </span>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write a short bio about yourself..."
                maxLength="200"
                value={aboutMe}
                onChange={handleAboutMeChange}
              ></textarea>
            </div>

            {/* Word Counter */}
            <div className="text-end small text-muted">
              {wordCount} / 200 words
            </div>
          </div>
        )}
        </div>






        {/* Submit Button */}
        <button 
          className="btn btn-success mt-4"
          onClick={handleSubmit}
          
          // disabled={!isFormComplete}
          >Submit Profile
        </button>

        {/* Warning Message (if any field is missing)
        {!isFormComplete && (
          <div className="text-danger mt-2">
            Please fill in all required fields before submitting.
          </div>
        )} */}
      </div>   
    </div>
  </div>
  

  
  );
};

export default JobSeekerDashboard;
