export const openPopUp = () => {
  document.body.classList.add('off');
  return true;
}

export const closePopUp = () => {
  document.body.classList.remove('off');
  return false;
}

export const openImages = (popupData: any, setPopupData: any, content: any) => {
  window.document.body.classList.add('off')
  setPopupData({...popupData,
    active: true,
    content: content})
}

export const openBitrixPopup = (formName: any, setPopupData: any) => {
  window.document.body.classList.toggle('off')
  setPopupData((prevState: any) => ({ ...prevState,
    open: !prevState.open,
    link: formName,
    [formName]: !prevState[formName] }));
};