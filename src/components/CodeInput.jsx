import React from 'react';
import '../styles/user.css';
const CodeInput = ({ readOnly, value }) => {
  return <InputFields readOnly={readOnly} value={value}></InputFields>;
};

class InputFields extends React.Component {
  handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [, fieldIndex] = name.split('-');

    let fieldIntIndex = parseInt(fieldIndex, 10);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < 5) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  render() {
    return (
      <section className='input-fields'>
        <InputFild
          name='field-1'
          length='8'
          handleChange={this.handleChange}
          readOnly={this.props.readOnly}
          value={this.props.value ? this.props.value.substring(0, 8) : ''}
        />
        <span>-</span>
        <InputFild
          name='field-2'
          length='4'
          handleChange={this.handleChange}
          readOnly={this.props.readOnly}
          value={this.props.value ? this.props.value?.substring(8, 12) : ''}
        />
        <span>-</span>
        <InputFild
          name='field-3'
          length='4'
          handleChange={this.handleChange}
          readOnly={this.props.readOnly}
          value={this.props.value ? this.props.value?.substring(12, 16) : ''}
        />
        <span>-</span>
        <InputFild
          name='field-4'
          length='4'
          handleChange={this.handleChange}
          readOnly={this.props.readOnly}
          value={this.props.value ? this.props.value?.substring(16, 20) : ''}
        />
        <span>-</span>
        <InputFild
          name='field-5'
          length='12'
          handleChange={this.handleChange}
          readOnly={this.props.readOnly}
          value={this.props.value ? this.props.value.substring(20, 32) : ''}
        />
      </section>
    );
  }
}
class InputFild extends React.Component {
  render() {
    return (
      <input
        style={{ margin: 10 }}
        type='text'
        name={this.props.name}
        maxLength={this.props.length}
        onChange={this.props.handleChange}
        readOnly={this.props.readOnly}
        placeholder={this.props.value}
      ></input>
    );
  }
}
export default CodeInput;
