import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  // State for form fields
  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const adminID = currentUser._id;
  const role = 'Student';
  const attendance = [];

  // Popup and loader state
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  // Set class name if situation is "Class"
  useEffect(() => {
    if (situation === 'Class') {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  // Fetch all classes for the admin
  useEffect(() => {
    dispatch(getAllSclasses(adminID, 'Sclass'));
  }, [adminID, dispatch]);

  // Handle class selection
  const changeHandler = (event) => {
    if (event.target.value === 'Select Class') {
      setClassName('Select Class');
      setSclassName('');
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  // Fields to be sent to the backend
  const fields = {
    name,
    rollNum,
    password,
    sclassName,
    adminID,
    role,
    attendance,
    email,
    address,
    phoneNumber,
    dateOfBirth,
    gender,
  };

  // Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === '') {
      setMessage('Please select a classname');
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  // Handle response from the backend
  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form className="registerForm" onSubmit={submitHandler} style={styles.form}>
          <span className="registerTitle" style={styles.title}>Add Student</span>

          {/* Name */}
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter student's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          {/* Class (if situation is "Student") */}
          {situation === 'Student' && (
            <>
              <label style={styles.label}>Class</label>
              <select
                style={styles.input}
                value={className}
                onChange={changeHandler}
                required
              >
                <option value="Select Class">Select Class</option>
                {sclassesList.map((classItem, index) => (
                  <option key={index} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Roll Number */}
          <label style={styles.label}>Roll Number</label>
          <input
            style={styles.input}
            type="number"
            placeholder="Enter student's Roll Number..."
            value={rollNum}
            onChange={(event) => setRollNum(event.target.value)}
            required
          />

          {/* Password */}
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter student's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />

          {/* Email */}
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter student's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          {/* Address */}
          <label style={styles.label}>Address</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter student's address..."
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            autoComplete="address"
            required
          />

          {/* Phone Number */}
          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            placeholder="Enter student's phone number..."
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            autoComplete="tel"
            required
          />

          {/* Date of Birth */}
          <label style={styles.label}>Date of Birth</label>
          <input
            style={styles.input}
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />

          {/* Gender */}
          <label style={styles.label}>Gender</label>
          <select
            style={styles.input}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Submit Button */}
          <button style={styles.button} type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </button>
        </form>
      </div>

      {/* Popup for messages */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default AddStudent;

// CSS Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    overflowY: 'auto', // Make the form scrollable if content overflows
    maxHeight: '90vh', // Limit height to 90% of viewport to avoid overlap
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};