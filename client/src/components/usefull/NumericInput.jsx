import React from "react";
import { Input } from "antd";

function NumericInput(props) {
  // Custom function to handle numeric input
  const handleNumericInput = (e) => {
    const { value } = e.target;
    // Use a regular expression to remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
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
      type="number"
      step="1"
      placeholder={props.placeholder || "Enter only numbers"} // Use the provided placeholder or a default one
      autoComplete="off-autofill"
    />
  );
}

export default NumericInput;
