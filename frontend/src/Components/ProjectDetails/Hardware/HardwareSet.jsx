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
    super(props);
    this.checkOutHw = this.checkOutHw.bind(this);
    this.checkInHw = this.checkInHw.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.state = {
      quantity: "",
      token: localStorage.getItem('jwtToken')
    };
  }

  componentDidUpdate(prevProps) {
    // Only update state if props have changed
    if (prevProps.amount !== this.props.amount || prevProps.availability !== this.props.availability) {
      this.setState({
        amount: this.props.amount,
        availability: this.props.availability,
      });
    }
  }

  async checkOutHw() {
    const qty = this.state.quantity === "" ? 0 : parseInt(this.state.quantity);
    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      };
      const bodyParameters = {
        project_id: this.props.id,
        hw_name: this.props.name,
        amount: qty
      };
      const response = await axios.post(
        'http://127.0.0.1:5000/api/hardware/request_hw',
        bodyParameters,
        config
      );
      if (response.status === 200) {
        // Call a method passed as prop from the parent component to update the parent's state
        this.props.onHardwareChange(response.data.return_hw.hw_possessed, response.data.return_hw.hw_available);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error:', error);
    }
  }

  async checkInHw() {
    const qty = this.state.quantity === "" ? 0 : parseInt(this.state.quantity);
    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      };
      const bodyParameters = {
        project_id: this.props.id,
        hw_name: this.props.name,
        amount: qty
      };
      const response = await axios.post(
        'http://127.0.0.1:5000/api/hardware/return_hw',
        bodyParameters,
        config
      );
      if (response.status === 200) {
        // Call a method passed as prop from the parent component to update the parent's state
        this.props.onHardwareChange(response.data.return_hw.hw_possessed, response.data.return_hw.hw_available);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error:', error);
    }
  }

  setQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  render() {
    return (
      <div className="HWS">
        <div className="project-details">
          <div className="centered-text hardware-name">
            {this.props.name}
          </div>
          <div className="centered-text hardware-data">
            <div>Taken: {this.props.amount}</div>
            <div>Available: {this.props.availability}</div>
          </div>
          <div className="hardware-inputs">
            <div className="hw-box">
              <TextField 
                id="outlined-basic" 
                label="Quantity" 
                variant="outlined" 
                value={this.state.quantity} 
                onChange={this.setQuantity} 
              />
            </div>
            <div className="hw-box">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.checkOutHw}
              >
                Check Out
              </Button>
            </div>
            <div className="hw-box">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.checkInHw}
              >
                Check In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HardwareSet;
