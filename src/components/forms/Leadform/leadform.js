import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../../assest/Image/logo.png';
import './form.css';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    schoolBoard: '',
    leadsource: '',
    pincode: '',
    organizationname: '',
    address: '',
    in_group: false,
    state: '',
    city: '',
    fullname: '',
    landlineNumber: '',
    email: '',
    designation: '',
    phoneNumber: '',
    no_students: '',
    file: null,
    close_date: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:8801/leadform', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setFormData({
        schoolBoard: '',
        leadsource: '',
        pincode: '',
        organizationname: '',
        address: '',
        in_group: false,
        state: '',
        city: '',
        fullname: '',
        landlineNumber: '',
        email: '',
        designation: '',
        phoneNumber: '',
        no_students: '',
        file: null,
        close_date: ''
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="main_container">
      <form action="#" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Section 1: Customer Information */}
        <div className="section_1">
          <img src={logo} alt="logo" className="logo" />
          <br />
          <div className="sec_1_label">Customer Information</div>
          <div className="sec_1_row_1">
            <div className="sec_1_column_1">
              <label htmlFor="schoolBoard">School Board</label>
              <select
                id="schoolBoard"
                name="schoolBoard"
                value={formData.schoolBoard}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="ICSE">ICSE</option>
                <option value="CBSE">CBSE</option>
                <option value="State">State</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="leadsource">Lead Source</label>
              <select
                id="leadsource"
                name="leadsource"
                value={formData.leadsource}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="ALT">ALT</option>
                <option value="ICT360">ICT360</option>
                <option value="Ulipsu">Ulipsu</option>
                <option value="Thantrajna">Thantrajna</option>
                <option value="Website">Website</option>
                <option value="Computer">Computer</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Others">Others</option>
              </select>
              <label htmlFor="pincode">Pin Code</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sec_1_column_2">
              <label htmlFor="organizationname">Organization Name</label>
              <input
                type="text"
                id="organizationname"
                name="organizationname"
                value={formData.organizationname}
                onChange={handleChange}
                required
              />
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="sec_1_column_3">
              <input
                type="checkbox"
                id="in_group"
                name="in_group"
                checked={formData.in_group}
                onChange={handleChange}
              />
              <label htmlFor="in_group">In Group</label>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="Karnataka">Karnataka</option>
                <option value="TamilNadu">TamilNadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Goa">Goa</option>
              </select>
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="Mangalore">Mangalore</option>
                <option value="Kasargod">Kasargod</option>
                <option value="Udupi">Udupi</option>
                <option value="Kodagu">Kodagu</option>
                <option value="Bantwal">Bantwal</option>
                <option value="Puttur">Puttur</option>
                <option value="Sullia">Sullia</option>
                <option value="Rural">Rural</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Decision Maker Information */}
        <div className="section_2">
          <div className="sec_2_label">Decision Maker Information</div>
          <div className="sec_2_row_1">
            <div className="sec_2_column_1">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              <label htmlFor="landlineNumber">Landline Number</label>
              <input
                type="number"
                id="landlineNumber"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
              />
            </div>
            <div className="sec_2_column_2">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sec_2_column_3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Lead Information */}
        <div className="section_3">
          <div className="sec_3_label">Lead Information</div>
          <div className="sec_3_row_1">
            <div className="sec_3_column_1">
              <label htmlFor="no_students">No Of Students</label>
              <input
                type="number"
                id="no_students"
                name="no_students"
                value={formData.no_students}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sec_3_column_2">
              <label htmlFor="file">Attachment (Max: 4MB)</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="sec_3_column_3">
              <label htmlFor="close_date">Expected Close Date</label>
              <input
                type="date"
                id="close_date"
                name="close_date"
                value={formData.close_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit and Clear Buttons */}
        <div className="form-group">
          <button type="submit">Submit</button>
          <button type="button" className="clr" onClick={() => setFormData({ ...formData, file: null })}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
