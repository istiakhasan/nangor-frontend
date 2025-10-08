"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

const NGForm = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
  mode,
  isReset = true,
}) => {
  const formConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;
  if (!!mode) formConfig["mode"] = resolver;
  const methods = useForm(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    submitHandler(data, reset);
    // reset();
  };

  useEffect(() => {
    if (isReset) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, methods, isReset]);
  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default NGForm;
