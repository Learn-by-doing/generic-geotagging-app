import React, { Component } from 'react';
import PropTypes from 'prop-types';

const createOptions = (options) => {
  let elements = [];

  for (let i = 0; i < options.length; i++) {
    elements.push(
      <option key={i} value={options[i].value}>{options[i].label}</option>
    )
  }
  return elements
}

class FormElement extends Component {
  render() {
    if (this.props.attribute.type === 'dropdown') {
      return (
        <label>
          {this.props.attribute.label}
          <select>
            {createOptions(this.props.attribute.options)}
          </select>
        </label>
      )

    } else {
      return (
        <label>
          {this.props.attribute.label}
          <input type="text" name={this.props.attribute.name} />
        </label>
      )
    }
  }
}

FormElement.propTypes = {
  attribute: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }))
  }),
}


export default FormElement;