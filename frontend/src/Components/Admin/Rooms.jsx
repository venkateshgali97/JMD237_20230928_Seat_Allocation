import { useEffect, useState } from 'react';
import AdminModuleApi from '../../Services/Admin/Admin';
import { toast } from 'react-toastify';

const Rooms = () => {
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    rows: '',
    cols: '',
  });
  const [totalRooms, setTotalRooms] = useState([])
  const [showSaveButton, setSaveButton] = useState(false)
  const [boxes, setBoxes] = useState([]);

  const getAllRoomsDetails = async () => {
    const response = await AdminModuleApi.getAllRooms()
    setTotalRooms(response.data)

  };

  useEffect(() => {
    getAllRoomsDetails()
  }, [])
  const onChangeHandler = (e) => {
    setRoomDetails({ ...roomDetails, [e.target.id]: e.target.value });
  }


  //for creating room structure
  const createRoom = () => {
    if (roomDetails.name.trim().length < 1) {
      toast.warning("Room name should not be empty")
    }
    else if (roomDetails.rows.trim().length < 1) {
      toast.warning("please provide number of rows")
    }
    else if (roomDetails.cols.trim().length < 1) {
      toast.warning("Please  provide number of columns")
    }
    else {
      if (roomDetails.rows > 10) {
        toast.warning("row value should be less than 10")
      }
      else if (roomDetails.cols > 10) {
        toast.warning("col value should be less than 10")
      }
      else {
        setSaveButton(true)
        const { rows, cols } = roomDetails;
        const newBoxes = [];
        let count = 0
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            row.push({ roomNumber: count += 1, is_alloted: false });
          }
          newBoxes.push(row);
        }
        setBoxes(newBoxes);
      }
    }
  }



  const RoomCreateHandler = async () => {
    const data = {
      name: roomDetails.name,
      boxes: boxes
    }
    let response = await AdminModuleApi.addRoom(data)
    if (response.status === 200) {
      toast.success("Room created successfully")
      setSaveButton(false)
      setRoomDetails({
        name: '',
        rows: '',
        cols: '',
      })
      getAllRoomsDetails()
    }
    else if (response.status === 201) {
      toast.error("Room Name Already existed")
    }
  }
  const Calculate_seats = (room) => {
    let available = 0
    let not_available = 0

    room.boxes.map((box) => {
      box.map((rm) =>{
        if (rm.is_alloted){
        available += 1
      }
      else{
        not_available += 1
      }
        
      })
     
    })

    return [available,not_available]
  }
  return (
    <>

      <div className="container-fluid">
        <div className='row'>
          <div className='col-12'>

          </div>
          <div className='col-lg-3 col-md-12'>
            <label htmlFor='name'>Room Name : </label>
            <input type='text' id='name' onChange={onChangeHandler} value={roomDetails.name} />
          </div>
          <div className='col-lg-3 col-md-12'>
            <label htmlFor='rows'>Rows : </label>
            <input type='number' id='rows' onChange={onChangeHandler} max="10" min="1" value={roomDetails.rows} />
          </div>
          <div className='col-lg-3 col-md-12'>
            <label htmlFor='cols'>Cols : </label>
            <input type='number' id='cols' onChange={onChangeHandler} max="10" min="1" value={roomDetails.cols} />
          </div>
          <div className='col-lg-3 col-md-12 my-4'>
            <button className='btn buttons px-4 py-2' onClick={createRoom}>Create Room</button>
          </div>
        </div>
      </div>


      {showSaveButton &&
        <div>
          <p>{roomDetails.name}</p>
          <div className="room">
            {boxes.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((box, colIndex) => (
                  <div
                    className='box'
                    key={box.roomNumber}
                  >{box.roomNumber}</div>
                ))}
              </div>
            ))}
          </div>

          <button className='btn buttons px-4 my-2' onClick={RoomCreateHandler}>Create</button>
        </div>
      }

      <div>
        <table className='admin-table'>
          <tr>
            <th>Name </th>
            <th>Booked</th>
            <th>Available</th>
            <th>Total</th>

          </tr>

          {totalRooms.map((room) => {
           let[a,b] =Calculate_seats(room)
            return (
              <tr>
                <td>{room.name}</td>
                <td>{a}</td>
                <td>{b}</td>
                <td>{a+b}</td>
              </tr>
            )
          })}

        </table>
      </div>
    </>
  );
}

export default Rooms;
