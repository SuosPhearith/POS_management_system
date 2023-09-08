import React from 'react';
import { Input } from 'antd';

function NumericInputFloat(props) {
  // Custom function to handle numeric input
  const handleNumericInput = (e) => {
    const { value } = e.target;
    // Use a regular expression to allow only numbers and a single dot for floating-point input
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Update the input value with the cleaned numeric value
    e.target.value = numericValue;
    // Pass the modified event to the parent component's onChange handler
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Input
      {...props}
      onChange={handleNumericInput}
      type="text" // Change type to "text" to allow any input
      placeholder={props.placeholder || "Enter numbers"} // Use the provided placeholder or a default one
      autoComplete="off" // Remove "-autofill" from the autoComplete value
    />
  );
}

export default NumericInputFloat;
