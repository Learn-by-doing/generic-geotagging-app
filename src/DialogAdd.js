import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from './config';
import FormElement from './FormElement';

const createFormElement = (attributes) => {
  let elements = []

  for (let i = 0; i < attributes.length; i++) {
    elements.push(
      <FormElement key={i} attribute={attributes[i]}/>
    )
  }
  return elements
}

class DialogAdd extends Component {
  render() {
    return (
      <div className="DialogAdd">
        <h2>{config.addItemModal.title}</h2>
        <form onSubmit={this.props.onSave}>
          {createFormElement(config.addItemModal.attributes)}
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

DialogAdd.propTypes = {
  onSave: PropTypes.func.isRequired
}

export default DialogAdd;