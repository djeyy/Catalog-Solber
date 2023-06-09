import {BitrixForm} from "@/components/bitrix-form/BitrixCallBackForm";

const createComponent = ((formId: string, loaderUrl: string) => {
  const createForm = ({...props}: { [key: string]: any }) => (
    <BitrixForm formId={formId} loaderUrl={loaderUrl} {...props} />
  );

  return createForm
});

export default createComponent;