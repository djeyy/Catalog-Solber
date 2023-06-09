import { useEffect } from 'react';

export const BitrixForm = ({ showForm, formId, loaderUrl }: any) => {
  useEffect(() => {
    if (showForm) {
      const script = document.createElement('script');
      script.setAttribute('data-b24-form', `inline/${formId}`);
      script.setAttribute('data-skip-moving', 'true');
      script.src = loaderUrl + '?' + (Date.now() / 180000 | 0);
      script.async = true;

      let formContainer = document.getElementById(`bitrix-form-container-${formId}`);

      if (!formContainer) {
        formContainer = document.createElement('div')

        formContainer.setAttribute('id', `bitrix-form-container-${formId}`)
      }

      formContainer.innerHTML = '';

      formContainer.appendChild(script);
    }
  }, [showForm, formId, loaderUrl]);

  return (
    <div id={`bitrix-form-container-${formId}`} />
  );
};