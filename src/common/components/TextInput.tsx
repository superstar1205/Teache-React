import React, { useState, ChangeEvent } from "react";
import { TextInputProps } from "../types/TextInput.types";
import "./TextInput.css";

function TextInput(props: TextInputProps): JSX.Element {
  const [touched, setTouch] = useState(false);
  const [error, setError] = useState("");
  const [htmlClass, setHtmlClass] = useState("");
  const [, setValue] = useState("");

  function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
    let [error, validClass, elementValue] = ["", "", event.target.value];

    [error, validClass] =
      !elementValue && props.required
        ? ["Value cannot be empty", "is-invalid"]
        : ["", "is-valid"];

    if (!error) {
      [error, validClass] =
        props.maxLength && elementValue && elementValue.length > props.maxLength
          ? [
              `Value can't have more than ${props.maxLength} characters`,
              "is-invalid",
            ]
          : ["", "is-valid"];
    }

    props.onChange({
      value: elementValue,
      error: error,
      touched: touched,
      field: props.field,
    });

    setTouch(true);
    setError(error);
    setHtmlClass(validClass);
    setValue(elementValue);
  }

  return (
    <div style={{}}>
      {props.label !== "" && (
        <label htmlFor={props.id.toString()}>{props.label}</label>
      )}
      <input
        value={props.value}
        type={props.type}
        onChange={onValueChanged}
        className={`form-control ${props.inputClass} ${htmlClass}`}
        id={`id_${props.label}`}
        placeholder={props.placeholder}
        style={{
          width: "445px",
          height: "51px",
          background: "#FFFFFF",
          boxShadow: "-1px -5px 55px 6px rgba(27, 30, 123, 0.09)",
          borderRadius: "10px",
          border: "none",
        }}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
}

export default TextInput;
