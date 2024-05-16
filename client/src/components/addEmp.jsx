import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
    image: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((course) => course !== value)
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/employeeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Employee data inserted successfully');
        // Reset form after successful insertion if needed
        setFormData({
          name: '',
          email: '',
          mobileNo: '',
          designation: '',
          gender: '',
          course: [],
          image: ''
        });
      } else {
        console.error('Failed to insert employee data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input type="tel" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select className="form-control" name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="form-check">
            <input type="radio" className="form-check-input" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
            <label className="form-check-label" htmlFor="male">Male</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
            <label className="form-check-label" htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="mca" name="course" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} />
            <label className="form-check-label" htmlFor="mca">MCA</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="bca" name="course" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} />
            <label className="form-check-label" htmlFor="bca">BCA</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="bsc" name="course" value="BSc" checked={formData.course.includes('BSc')} onChange={handleChange} />
            <label className="form-check-label" htmlFor="bsc">BSc</label>
          </div>
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary ml-2"><Link to='/employeeData' className='linkToAdd'>Cancel</Link></button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
