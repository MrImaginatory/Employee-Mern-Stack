import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './employeeData.css'; // Import CSS file for styling

function EmployeeDataPage() {
  const [employeeData, setEmployeeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const navigate = useNavigate();
  const employeesPerPage = 5; // Number of employees to display per page
  const pagesVisited = pageNumber * employeesPerPage;

  useEffect(() => {
    fetchEmployeeData();
  }, [pageNumber]);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:8000/employeeData');
      if (response.ok) {
        const data = await response.json();
        setEmployeeData(data);
      } else {
        console.error('Failed to fetch employee data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/employeeData/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployeeData(employeeData.filter(employee => employee._id !== id));
        toast.success("Login Successfully",{position:"top-right"})
        console.log('Employee deleted successfully');
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowAlert(false); // Close the alert modal
  };

  const handleShowAlert = (id) => {
    setShowAlert(true);
    setDeleteId(id);
  };

  const handleEdit = (id) => {
    navigate(`/updateEmployee/${id}`);
  };

  const pageCount = Math.ceil(employeeData.length / employeesPerPage);

  const changePage = (page) => {
    setPageNumber(page);
  };

  return (
    <div className="employee-data-container">
      <h1>Employee Data</h1>
      <button className='btn btn-primary'><Link to='/add' className='linkToAdd'>AddEmployee</Link></button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Display employees for the current page */}
          {employeeData.slice(pagesVisited, pagesVisited + employeesPerPage).map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{Array.isArray(employee.course) ? employee.course.join(', ') : employee.course}</td>
              <td>
                <img src={employee.image} alt={employee.name} className="employee-image" />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleShowAlert(employee._id)}><span className="material-symbols-outlined">
delete
</span></Button>
                <Button variant="primary" onClick={() => handleEdit(employee._id)}><span className="material-symbols-outlined">
edit
</span></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap-like Pagination */}
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous" onClick={() => changePage(pageNumber - 1)}>
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
    {[...Array(pageCount)].map((_, index) => (
      <li className={`page-item ${index === pageNumber ? 'active' : ''}`} key={index}>
        <a className="page-link" href="#" onClick={() => changePage(index)}>
          {index + 1}
        </a>
      </li>
    ))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={() => changePage(pageNumber + 1)}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>


      {/* Alert modal for delete confirmation */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showAlert ? 'block' : 'none' }}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Confirm Delete</h5>
        <button type="button" className="close" onClick={() => setShowAlert(false)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this employee?</p>
      </div>
      <div className="modal-footer">
        <Button variant="secondary" onClick={() => setShowAlert(false)}>Cancel</Button>
        <Button variant="danger" onClick={() => handleDelete(deleteId)}>Delete</Button>
      </div>
    </div>
  </div>
</div>
<Toaster/>

      
    </div>
  );
}

export default EmployeeDataPage;




{/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.slice(pagesVisited, pagesVisited + employeesPerPage).map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNumber}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{Array.isArray(employee.course) ? employee.course.join(', ') : employee.course}</td>
              <td>
                <img src={employee.image} alt={employee.name} className="employee-image" />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleShowAlert(employee._id)}>Delete</Button>
                <Button variant="primary" onClick={() => handleEdit(employee._id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
