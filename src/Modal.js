import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="modalStyle">
          <p className="title">
            {this.props.title} 
          </p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;