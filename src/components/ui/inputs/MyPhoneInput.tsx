import React, {useEffect} from "react";
import PhoneInput from "react-phone-input-2";

export const MyPhoneInput = (
  {
    value,
    disabled,
    onChange,
    isActive,
    btnHelp,
    setIsActive,
    isError,
    setIsError,
    isFunction,
    ...props
  }: any) => {
  useEffect(() => {
    if (value == null) {
      return
    }

    if(value.length === 1 ) {
      onChange('7')
    }

    if(value.length === 1 && value === '9') {
      onChange('79')
    }

  }, [value, onChange])

  return (
    <div {...props} className="MyPhoneInput form-item">
      <PhoneInput
        onBlur={() => setIsError(value?.length !== 11)}
        onFocus={() => setIsError(false)}
        disabled={disabled}
        specialLabel=''
        placeholder=''
        value={value}
        onChange={onChange}
        inputClass={`MyPhoneInput__input form-input ${isError && 'error'} ${disabled && 'disabled'}`}
        onEnterKeyPress={isFunction}
      />
      {<label className={
        value
          ? 'inputText__label form-label valid'
          : 'inputText__label form-label'
      }
      >
        Номер телефона
        <sup>*</sup>
      </label>}
      {btnHelp
        ? value?.length === 11
          ? <div onClick={()=> onChange('')} className="MyPhoneInput__help">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6Z" fill="currentColor"/>
            </svg>
          </div>
          : <div onClick={() => setIsActive(!isActive)} className={isError ? "MyPhoneInput__help error" : "MyPhoneInput__help"}>
            {isError
              ? <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM10 0C4.47 0 0 4.5 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0M10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18Z" fill="currentColor"/>
              </svg>
              : <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16H11V14H9V16ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C8.93913 4 7.92172 4.42143 7.17157 5.17157C6.42143 5.92172 6 6.93913 6 8H8C8 7.46957 8.21071 6.96086 8.58579 6.58579C8.96086 6.21071 9.46957 6 10 6C10.5304 6 11.0391 6.21071 11.4142 6.58579C11.7893 6.96086 12 7.46957 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4Z" fill="currentColor"/>
              </svg>
            }
            <div className={isActive ? "MyPhoneInput__balloon active": "MyPhoneInput__balloon"}>
              Телефон в формате: + 7 000 000 00 00
            </div>
          </div>
        : <div></div>
      }
    </div>
  );
};