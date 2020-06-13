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


function App() {

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  
  const [saveAction, setSaveAction] = useState(false);
  const [uName, setuName] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');

const SaveUser = () => {
	setSaveAction(true);
};	
    const [postId, setPostId] = useState(null);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [users, setusers] = useState([]);

    useEffect(() => {
		if(saveAction){
			var province = document.getElementById("province");
			var khet = document.getElementById("khet");
			var khwang = document.getElementById("khwang");
			fetch("/api/saveuser/"+uName+"/"+fName+"/"+lName+"/"+email+"/"+province.options[province.selectedIndex].value+"/"+khet.options[khet.selectedIndex].value+"/"+khwang.options[khwang.selectedIndex].value)
			  .then(res => res.json())
			  .then(
				(result) => {
				  setIsLoaded(true);
				  setusers(result);
				},
				(error) => {
				  setIsLoaded(true);
				  setError(error);
				}
			  )
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					username: {uName},
					firstname:{fName},
					lastname:{lName},
					email:{email},
					provinceid: province.options[province.selectedIndex].value,
					khetid: khet.options[khet.selectedIndex].value,
					khwang: khwang.options[khwang.selectedIndex].value
				})
			};
			setuName('');
			setfName('');
			setlName('');
			setEmail('');
			setIsOpen(false);
		}
		setSaveAction(false);
		
    }, [saveAction])

	const Table = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setusers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (      
    <table className="table">
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
			  <td><button onClick={() => DeleteUser(item)}>delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>
  );
  }
  
}

	const EditUser = (key) => {
		setuName(key.USERNAME);
		setfName(key.FIRSTNAME);
		setlName(key.LASTNAME);
		setEmail(key.EMAIL);
		setIsOpen(true);
	};	
	
	const DeleteUser = (key) => {
		setDelKey(key.USERID);
		setDelAction(true);
	};
	
	const [delAction, setDelAction] = useState(false);
	const [delKey, setDelKey] = useState('0');

	  useEffect(() => {
		  if(setDelAction){
			  fetch("/api/deluser"+delKey)
		  }
		  setDelAction(false);
		

	  }, [delAction])
  
  return (
      <div className="App">
		<button onClick={showModal}>Add</button>
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
          <button onClick={SaveUser}>Save</button>
        </Modal.Footer>
      </Modal>
        <Table />
      </div>
    );
}

export default App;
