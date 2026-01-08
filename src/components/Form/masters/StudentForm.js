import React, { useState } from "react";
import "./StudentForm.css"; 
import axios from "axios";


const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      await axios.post("https://localhost:44364/api/Students", student,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );
      alert("Student added successfully!");

      // Clear form
      setStudent({
        name: "",
        age: "",
        email: ""
      });
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to save student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Save</button>
  
    </form>
  );
};

export default StudentForm;
