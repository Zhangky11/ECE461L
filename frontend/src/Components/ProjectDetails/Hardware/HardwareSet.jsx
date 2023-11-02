import React, {useState, useContext} from 'react'
// import { UserContext } from '../../../App'
import './HardwareSet.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

class HardwareSet extends React.Component {
  constructor(props) {
    super(props)
    this.checkOutHw = this.checkOutHw.bind(this)
    this.checkInHw = this.checkInHw.bind(this)
    this.setQuantity = this.setQuantity.bind(this)
    this.toggle = this.toggle.bind(this)
    this.makeCall = this.makeCall.bind(this)
    this.state = {
      name: "Hardware Set 1",
      capacity: 100,
      quantity: "",
      checkedOut: 0,
    }
  }

  render() {
    return (
      <div className = "HWS">
        <div className = "project-details">
          <div className = "centered-text hardware-name">
            {this.props.name}
          </div>
          <div className="centered-text hardware-data">
            <div>Taken: {this.state.checkedOut}</div>
            <div>Available: {this.props.capacity}</div>
          </div>
          <div className = "hardware-inputs">
            <div className = "hw-box"><TextField id="outlined-basic" label="Quantity" variant="outlined" value={this.state.quantity} onChange={this.setQuantity} /></div>
            <div className = "hw-box"><Button variant="contained" color="primary" onClick={this.checkOutHw}>Check Out</Button></div>
            <div className = "hw-box"><Button variant="contained" color="primary" onClick={this.checkInHw}>Check In</Button></div>
          </div>
        </div>
      </div>
    )
  }

  async checkOutHw() {
    var qty = this.state.quantity===""? 0 : parseInt(this.state.quantity);
    // const response = await this.makeCall("checkout/" + this.props.projectid + "/" + qty)
    // alert(response.qty + " hardware checked out")

    var checkedOutVal = this.state.checkedOut + qty
    if(checkedOutVal > this.props.capacity) checkedOutVal = this.props.capacity;
    this.setState({
      checkedOut: checkedOutVal
    })
    
  }

  async checkInHw() {
    var qty = this.state.quantity===""? 0 : parseInt(this.state.quantity);
    if(qty === 'NaN' || qty == null) qty = 0;
    // const response = await this.makeCall("checkin/" + this.props.projectid + "/" + qty);
    // alert(response.qty + " hardware checked in")

    var checkedInVal = this.state.checkedOut - qty 
    if(checkedInVal < 0) checkedInVal = 0;
    this.setState({
      checkedOut: checkedInVal
    }) 
  }

  async makeCall(url) {
    try {
      const response = await axios.get("http://127.0.0.1:5000/" + url); 
      console.log(response.data);
      return response.data;
    } catch(err) {
      console.error(err);
    }
    return null;
  }

  toggle() {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  setQuantity(event) {
    this.setState({quantity: event.target.value});
  }
}

export default HardwareSet