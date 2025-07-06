import React, { useState } from "react";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min";
import { FaDownload } from "react-icons/fa";
import "./CreateResume.css";

const CreateResume = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    photo: null,
  });

  const [template, setTemplate] = useState("modern");
  const [showResume, setShowResume] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("myResume", JSON.stringify({ ...form, template }));
    setShowResume(true);
  };

  const handleDownload = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 0.5,
      filename: `${form.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="resume-form-container">
      <h2>Create Your Resume</h2>

      {!showResume ? (
        <form onSubmit={handleSubmit} className="resume-form">
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email Address" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />

          <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} />
          <textarea name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
          <textarea name="education" placeholder="Education" onChange={handleChange} />
          <textarea name="experience" placeholder="Experience" onChange={handleChange} />

          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
          </select>

          <button type="submit">Generate Resume</button>
        </form>
      ) : (
        <>
          <div id="resume-preview" className={`resume-preview ${template}`}>
            {form.photo && (
              <img src={form.photo} alt="Profile" className="resume-photo" />
            )}
            <h3>{form.name}</h3>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <h4>Professional Summary</h4>
            <p>{form.summary}</p>
            <h4>Skills</h4>
            <p>{form.skills}</p>
            <h4>Education</h4>
            <p>{form.education}</p>
            <h4>Experience</h4>
            <p>{form.experience}</p>
          </div>

          <div className="download-icon-wrapper" onClick={handleDownload} title="Download PDF">
            <FaDownload className="download-icon" />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateResume;
