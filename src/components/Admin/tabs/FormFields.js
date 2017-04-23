/* eslint no-unneeded-ternary: "off", react/no-array-index-key: "off" */
import React from 'react';

const Input = ({ ...props }) => (
  <div className="field">
    <label htmlFor={props.name} className="label">{props.placeholder}</label>
    <p className="control">
      <input className="input" {...props} />
    </p>
  </div>
);

const Select = ({ ...props }) => (
  <div className="field">
    <label htmlFor={props.name} className="label">{props.label}</label>
    <p className="control">
      <select
        type="select"
        className="input"
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
    </p>
  </div>
);


export { Input, Select };
