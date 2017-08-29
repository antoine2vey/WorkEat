/* eslint no-unneeded-ternary: "off", react/no-array-index-key: "off" */
import React from 'react';

const Input = ({ ...props }) => (
  <div className="material-field has-label">
    <label htmlFor={props.name} className="material-field__label" onFocus={props.focusInput} onBlur={props.blurInput}>{props.placeholder}</label>
    <input className="material-field__input" {...props} />
  </div>
);

const Select = ({ ...props }) => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <select
      type="select"
      className="admin__select"
      style={{ height: 100 }}
      name={props.name}
      multiple={props.multiple ? true : false}
      onChange={props.onChange}
    >
      { props.data.map((item, i) => (
        props.flat ? (
          <option value={item.toLowerCase()} key={i}>{item}</option>
        ) : (
          <option value={item._id} key={item._id}>{item.name}</option>
        )
      ))}
    </select>
  </div>
);

const CheckBox = ({ ...props }) => (
  <div className="field">
    <p className="control">
      <label htmlFor={props.name} className="checkbox">
        <input
          id={props.name}
          name={props.name}
          type="checkbox"
          onChange={props.onChange}
          checked={props.selected || undefined}
        />
        {props.children}
      </label>
    </p>
  </div>
);


export { Input, Select, CheckBox };
