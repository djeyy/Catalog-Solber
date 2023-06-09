import React from "react";
import Select from "react-select";

type Props = {
  options: any;
  setValue: any;
  placeholder?: string;
  isClearable: boolean;
  isSearchable: boolean;
  noOptionsMessage: string;
  [key: string]: any;
}

export const CustomSelect = ({options, setValue, placeholder,isClearable, noOptionsMessage, isSearchable, ...props}: Props) => {
  const styles = {
    menuList: (base: any) => {
      return {
        ...base,
        "::-webkit-scrollbar": {
          width: "6px",
          height: "0",
        },
        "::-webkit-scrollbar-track": {
          background: "var(--color-gray200)"
        },
        "::-webkit-scrollbar-thumb": {
          background: "var(--color-orange400)"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "var(--color-orange600)"
        }
      }
    }
  }

  return (
    <Select
      {...props}
      id={'5'}
      placeholder={placeholder}
      styles={styles}
      isClearable={isClearable}
      isSearchable={isSearchable}
      className={"customSelect"}
      classNamePrefix={"customSelect"}
      options={options}
      noOptionsMessage={({inputValue}) => !inputValue && noOptionsMessage}
      onChange={(value) => setValue(value)}
    />
  );
};