import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import logo from './logo.svg';
import './App.css';
import Provinces from './province.js';
import Khets from './khet.js';
import Khwangs from './khwang.js';
import axios from 'axios';


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setuName('');
    setfName('');
    setlName('');
    setEmail('');
    setIsOpen(false);
    setIsEdit(false);
    setIsAdd(true);
  };
  
  const [userID, setUserID] = useState('');
  const [uName, setuName] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const province = document.getElementById("province");
	const khet = document.getElementById("khet");
	const khwang = document.getElementById("khwang");

const AddUser = () => {
  axios.post('/api/users', {
    username: uName,
		firstname:fName,
		lastname:lName,
		email:email,
		provinceid: province.options[province.selectedIndex].value,
		khetid: khet.options[khet.selectedIndex].value,
		khwangid: khwang.options[khwang.selectedIndex].value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  setuName('');
	setfName('');
	setlName('');
  setEmail('');
  setIsOpen(false);
};	

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
    .then((response) => {
      setUsers(response.data)
    });
    
  }, [])

	const Table = () => {  
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = users.filter(person =>
      person.FIRSTNAME.toLowerCase().includes(searchTerm) || person.LASTNAME.toLowerCase().includes(searchTerm) 
    );
    setSearchResults(results);
  }, [searchTerm]);
    
  return (      
    <table className="table">
      <thead>
        <tr>
	        <td>
            <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                />
          </td>
        </tr>
      </thead>

      <thead>
        <tr>
		  <th>USERID</th>
		  <th>USERNAME</th>
          <th>FIRSTNAME</th>
          <th>LASTNAME</th>
          <th>EMAIL</th>
          <th>PROVINCENAME</th>
          <th>KHETNAME</th>
          <th>KHWANGNAME</th>
		  <th>ZIPCODE</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map(item => (
          <tr key={ item.USERID }>
			  <td>{ item.USERID }</td>
			  <td>{ item.USERNAME }</td>
              <td>{ item.FIRSTNAME }</td>
              <td>{ item.LASTNAME }</td>
              <td>{ item.EMAIL }</td>
			  <td>{ item.PROVINCENAME }</td>
			  <td>{ item.KHETNAME }</td>
			  <td>{ item.KHWANGNAME }</td>
			  <td>{ item.ZIPCODE }</td>
			  <td><button onClick={() => EditUser(item)}>edit</button></td>
			  <td><button onClick={() => DeleteUser(item.USERID)}>delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>
  );  
}

	const EditUser = (key) => {
    setIsEdit(true);
    setIsAdd(false);
		setuName(key.USERNAME);
		setfName(key.FIRSTNAME);
		setlName(key.LASTNAME);
    setEmail(key.EMAIL);
    setUserID(key.USERID);
		setIsOpen(true);
  };	
  
  const EditCommit = () => {
    axios.put('/api/users/'+userID, {
      username: uName,
      firstname:fName,
      lastname:lName,
      email:email,
      provinceid: province.options[province.selectedIndex].value,
      khetid: khet.options[khet.selectedIndex].value,
      khwangid: khwang.options[khwang.selectedIndex].value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
    setuName('');
    setfName('');
    setlName('');
    setEmail('');
    setIsOpen(false);
    setIsEdit(false);
    setIsAdd(true);
	};	
  

  
	const DeleteUser = (key) => {
		axios.delete('/api/users/'+key);
  };
	
  
  return (
      <div className="App">
		<button onClick={showModal} variant="primary">Add</button>
    
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
		<label>Username: </label><input type="text" placeholder="Username" value={uName} onChange={e => setuName(e.target.value)}/><br/>
		<label>FirstName: </label><input type="text" placeholder="FirstName" value={fName} onChange={e => setfName(e.target.value)}/><br/>
		<label>LastName: </label><input type="text" placeholder="LastName" value={lName} onChange={e => setlName(e.target.value)}/><br/>
		<label>LastName: </label><input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
		<label>Provinces: </label><Provinces /><br/>
		<label>Khets: </label><Khets/><br/>
		<label>Khwangs: </label><Khwangs/><br/>
		</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          {isAdd ? <button onClick={AddUser}>Add</button> : <div></div>}
          {isEdit ?<button onClick={EditCommit}>Edit</button> : <div></div>}
        </Modal.Footer>
      </Modal>
        <Table />
      </div>
    );
}

export default App;
