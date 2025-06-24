import React, { useState } from 'react';
import axios from 'axios';
import './atlclass.css'

const AtlForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    college: '',
    date: '',
    fromTime: '',
    toTime: '',
    students: '',
    classDetails: '',
    trainer: '',
    expense: '',
    expenseDetails: '',
    comments: '',
    requirements: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      const response = await axios.post('http://your-backend-url/data-save', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setFormData({
        email: '',
        college: '',
        date: '',
        fromTime: '',
        toTime: '',
        students: '',
        classDetails: '',
        trainer: '',
        expense: '',
        expenseDetails: '',
        comments: '',
        requirements: '',
        image: null
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="container-atlclass">
      <h1 className="main_title">ATL CLASS DK</h1>
      <form className="googleform" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* College Selection */}
        <div className="form-group">
          <label>Select your college name:</label>
          <select
            className="form-control"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="">Select College</option>
            {/* Add options dynamically based on your data */}
            <option value="Government High School Elimale">Government High School Elimale</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Range */}
        <div className="form-group">
          <label htmlFor="fromTime">From:</label>
          <input
            type="time"
            className="form-control"
            id="fromTime"
            name="fromTime"
            value={formData.fromTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="toTime">To:</label>
          <input
            type="time"
            className="form-control"
            id="toTime"
            name="toTime"
            value={formData.toTime}
            onChange={handleChange}
          />
        </div>

        {/* Number of Students */}
        <div className="form-group">
          <label htmlFor="students">Number of Students:</label>
          <input
            type="number"
            className="form-control"
            id="students"
            name="students"
            value={formData.students}
            onChange={handleChange}
          />
        </div>

        {/* Class Details */}
        <div className="form-group">
          <label htmlFor="classDetails">Class Details:</label>
          <textarea
            className="form-control"
            id="classDetails"
            name="classDetails"
            value={formData.classDetails}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Trainer */}
        <div className="form-group">
          <label htmlFor="trainer">Trainer:</label>
          <input
            type="text"
            className="form-control"
            id="trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expense */}
        <div className="form-group">
          <label htmlFor="expense">Expense:</label>
          <input
            type="text"
            className="form-control"
            id="expense"
            name="expense"
            value={formData.expense}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expense Details */}
        <div className="form-group">
          <label htmlFor="expenseDetails">Expense Details:</label>
          <textarea
            className="form-control"
            id="expenseDetails"
            name="expenseDetails"
            value={formData.expenseDetails}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Comments */}
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Requirements */}
        <div className="form-group">
          <label htmlFor="requirements">Requirements:</label>
          <textarea
            className="form-control"
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Upload Images:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {/* Clear Button */}
        <button type="button" className="btn btn-secondary" onClick={() => setFormData({})}>
          Clear Form
        </button>
      </form>
    </div>
  );
};

export default AtlForm;
