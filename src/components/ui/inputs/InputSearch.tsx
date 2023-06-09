import React, {useEffect, useState} from "react";
import {SearchSvg} from "@/components/ui/svg/SearchSvg";
import {CloseSvg} from "@/components/ui/svg/CloseSvg";

type Props = {
  value: string;
  onInput: any
  placeholder: string;
  [key: string]: any;
}

export const InputSearch = ({value, onInput, placeholder, ...props}: Props) => {
  const [closeButton, setCloseButton] = useState(<></>);

  useEffect(() => {
    setCloseButton(value
      ? <div onClick={() => onInput('')} className={'inputSearch__close'}>
        <div className="inputSearch__svg">
          <CloseSvg/>
        </div>
      </div>
      : <></>
    )
  }, [value])

  return (
    <div className="inputSearch">
      <div className="inputSearch__svg">
        <SearchSvg/>
      </div>
      <input
        {...props}
        autoFocus
        className="inputSearch__input"
        type="text"
        onInput={({target: {value}}: any) => onInput(value)}
        value={value}
        placeholder={placeholder}
      />
      {closeButton}
    </div>
  );
};