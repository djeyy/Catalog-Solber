import React from 'react';

type Props = {
  fill: boolean;
  isLabel: boolean;
  error: boolean;
  secondError: boolean;
  bgError: boolean;
  disabled: boolean;
  type: string;
  value: string;
  textError: string;
  placeholder: string;
  setValue: React.Dispatch<string>;
  Important: boolean;
  [key: string]: any;
}

export const InputText = ({
                            fill,
                            isLabel,
                            error,
                            secondError,
                            bgError,
                            type,
                            value,
                            textError,
                            placeholder,
                            setValue,
                            disabled,
                            Important,
                            ...props}: Props) => {
  return (
    <div className={
      error
        ? "inputText__wrapper error"
        :"inputText__wrapper"
    }>
      <div className={
        error
          ? "inputText error form-item"
          : "inputText form-item"
      }>
        <input {...props}
               className={
                 bgError || disabled
                   ? "inputText__input form-input disabled"
                   : "inputText__input form-input"
               }
               type={type}
               disabled={disabled}
               value={value}
               onChange={({target: {value}}) => setValue(value)}
        />
        {isLabel && <label className={
          value
            ? "inputText__label form-label valid"
            : "inputText__label form-label"}
        >
          {placeholder}
          {Important ? <sup>*</sup> : <></>}
        </label>}
      </div>
      {fill &&
          <div className={"inputText__text"}>
            {textError}
          </div>
      }
    </div>
  );
};