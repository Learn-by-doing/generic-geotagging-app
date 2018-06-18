import React, { Component } from 'react';
import './Modal.css';

// After adding a new item's location, 
// open a modal window to set the item's attributes (category, description, etc)
class Modal extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="modal-style">
          <h2>{this.props.title}</h2>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;