import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form } from 'react-bootstrap';
import '../../Styles/user.css'
import UserApis from '../../Services/User/User';
function Users() {
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [totalUsers, setTotalUsers] = useState([])
    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        designation: ""

    })
    const [searchQuery, setSearchQuery] = useState("");
    const toggleAddUserModal = () => {
        setAddUserModalOpen((prevIsOpen) => !prevIsOpen);
    };

    const getAllUsers = async () => {
        const response = await UserApis.getAllUsers()
        console.log(response, "this is all users")
        setTotalUsers(response.data)
    };

    useEffect(() => {
        getAllUsers()
    }, [])

    const createUserHandler = async () => {
        if (user.name.trim().length < 1) {
            toast.error("Name is required")
        }
        else if (user.email.trim().length < 1) {
            toast.error("Email is required")
        }
        else if (user.contact.trim().length < 10) {
            toast.error("Contact Number should be 10 digits")
        }
        else if (user.designation.trim().length < 1) {
            toast.error("Designation required")
        }
        else {
            setAddUserModalOpen(false)
            const response = await UserApis.addUser(user)
            if (response.status === 200) {
                toast.success("User created successfully")
                getAllUsers()
            }
            else if (response.status === 201) {
                toast.warning("user already existed")
            }
        }
    }

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const filterHandler = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = totalUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredUsers)
    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-sm-3'>
                        <input type='search' placeholder='Enter User Name' onChange={filterHandler} />
                    </div>
                    <div className='col-sm-3'>
                        <button className='add-user-button px-5' onClick={() => setAddUserModalOpen(true)}>Add User</button>
                    </div>
                </div>
            </div>

            <br />

            <table className='admin-table'>
                <tr>
                    <th>Name </th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Room Name</th>
                    <th>Room Number</th>
                </tr>

                {filteredUsers.map((user) => {
                    return (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.designation}</td>
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>{(user.roomName) ? user.roomName : "NA"}</td>
                            <td>{(user.roomNumber) ? user.roomNumber : "NA"}</td>
                        </tr>
                    )
                })}

            </table>

            <Modal show={isAddUserModalOpen} onHide={toggleAddUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="Name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"

                                // value={newUser.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                // value={newUser.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contact">
                            <Form.Label>Contact:</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"

                                // value={newUser.contact_no}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="designation">
                            <Form.Label>Designation:</Form.Label>
                            <Form.Control
                                type="text"
                                name="designation"

                                // value={newUser.designation}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='buttons' onClick={createUserHandler}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Users;
