
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import UserApis from '../../Services/User/User';
import AdminModuleApi from '../../Services/Admin/Admin';

const UserRooms = () => {
  const [roomDetails, setRoomDetails] = useState([]);
  const [logInUser, setLoginUser] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [previousRoomName, setPreviousRoomName] = useState("")
  const [previousRoomNumber, setPreviousRoomNumber] = useState("")
  const [currentRoomName, setCurrentRoomName] = useState("")
  const [currentRoomNumber, setCurrentRoomNumber] = useState("")
  const [selectedRoomDetils, setSelectedRoomDetails] = useState({
    name: "",
    id: "",
    colIndex: "",
    rowIndex: "",
    roomIndex: ""
  })
  const email = localStorage.getItem("email")

  const getLogInUserDetails = async () => {
    const response = await UserApis.LoginUser(email)
    setLoginUser(response.data)
    setPreviousRoomName(response.data[0].roomName)
    setPreviousRoomNumber(response.data[0].roomNumber)
  }
  const getAllRooms = async() => {
    const response = await AdminModuleApi.getAllRooms()
    console.log(response, "This is all room Details")
    setRoomDetails(response.data)
   
  };

  useEffect(() => {
    getAllRooms();
    getLogInUserDetails()
  }, []);


  const seatAllocationHandler = async() => {
    let data = {
      currentRoomName,
      currentRoomNumber,
      previousRoomName,
      previousRoomNumber
    }

    const response = await AdminModuleApi.updateUserDetailsAndRoomDetails(data)
    setShowModal(false)
    
    let UserData = {
      name: logInUser[0].name,
      email: logInUser[0].email,
      contact: logInUser[0].contact,
      designation: logInUser[0].designation,
      roomNumber: currentRoomNumber,
      roomName: currentRoomName

    }

    const response1 = await UserApis.UpdateUser(UserData)
    console.log(response, "this is for updating rooms")
    console.log(response1, "this is for updating user")
    if (response.status==200 && response1.status==200){
      getAllRooms();
      getLogInUserDetails()
      toast.success("user information updated successfully", {
        autoClose : 500
      })
  }
  else{
    toast.error("User Information updation Failed")
  };
}
  return (
    <>
      <div className='container'>
        <div className='row'>

          <div className='col-12'>
            <table>
              <tr>
                <th>Name </th>
                <th>Designation</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Room Name</th>
                <th>Room Number</th>
              </tr>
              <tr>
                {logInUser.map((user) => {
                  return (
                    <>
                      <td>{user.name}</td>
                      <td>{user.designation}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>{(user.roomName) ? user.roomName : "NA"}</td>
                      <td>{(user.roomNumber) ? user.roomNumber : "NA"}</td>
                    </>
                  )
                })}
              </tr>
            </table>
            <hr />
          </div>

          {roomDetails.map((room, roomIndex) => (
            <div key={roomIndex} className='col-lg-4  col-md-12 my-4 room-container'>
              <p>{room.name}</p>

              <div className='room'>
                {room.boxes.map((row, rowIndex) => (
                  <div className='row' key={rowIndex}>
                    {row.map((box, colIndex) => (
                      <div
                        className={`box ${box.is_alloted ? 'alloted' : 'not-alloted'}`}
                        key={box._id}

                        onClick={() => {

                          if (!box.is_alloted) {
                            setCurrentRoomName(room.name)
                            setCurrentRoomNumber(box.roomNumber)
                            setSelectedRoomDetails({
                              name: room.name,
                              id: box.roomNumber,
                              rowIndex: rowIndex,
                              colIndex: colIndex,
                              roomIndex: roomIndex,


                            })
                            setShowModal(true)

                          }
                          else {
                            toast.error("Not available", {
                              autoClose: 900,
                            });
                          }

                        }} 
                      >

                        <i className={`fa-solid fa-couch room-icon ${box.is_alloted ? 'icon-alloted' : ''}`}></i> <br />
                        <span className={`room-number ${box.is_alloted ? 'icon-alloted' : ''}`}>{box.roomNumber}</span>

                      </div>
                    ))}

                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Want to book seat in {selectedRoomDetils.name}({selectedRoomDetils.id})?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={seatAllocationHandler}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRooms;
