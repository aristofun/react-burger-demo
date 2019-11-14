import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputEl;
  const inputClasses = [ classes.InputElement ];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputEl = <input {...props.elementConfig} value={props.value}
                       onChange={props.onChange}
                       className={inputClasses.join(' ')}/>;
      break;
    case ('textarea'):
      inputEl = <textarea {...props.elementConfig} value={props.value}
                          onChange={props.onChange}
                          className={inputClasses.join(' ')}/>;
      break;
    case ('select'):
      inputEl = (<select value={props.value}
                         onChange={props.onChange}
                         className={inputClasses.join(' ')}>
        {props.elementConfig.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.display}</option>
        ))}
      </select>);
      break;
    default:
      inputEl = <input {...props.elementConfig} value={props.value} onChange={props.onChange}
                       className={inputClasses.join(' ')}/>;
      break;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default Input;