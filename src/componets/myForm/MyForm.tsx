import { FC, useMemo } from 'react';
import {
  Formik, Form, Field, ErrorMessage, FieldProps,
} from 'formik';
import * as Yup from 'yup';


export interface FormValues {
  email: string,
  discordId: string
}

export const initialValues: FormValues = {
  email: '',
  discordId: '',
};

export const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  discordId: Yup.string()
    .min(17, 'must be at least 17 characters long').required('Required'),
});

interface MyFormProps {
  onSubmit: (values: FormValues) => void
}

export const MyForm: FC<MyFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        onSubmit(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {(formik) => {
        return useMemo(() => {
          return (
            <Form className="form" role="form">
              <h2 className="form__heading">Log In</h2>
              <label htmlFor="discordId" className="form__label">
                <ErrorMessage name="discordId" className="form__error" component="div" />
                <Field name="discordId">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <input
                        type="text"
                        className={`form__input ${meta.error
                          && meta.touched && 'error--color'}`}
                        placeholder="DiscordID"
                        {...field}
                      />
                    );
                  }}
                </Field>
              </label>

              <label htmlFor="email" className="form__label">
                <ErrorMessage name="email" className="form__error" component="div" />
                <Field name="email">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <input
                        type="email"
                        className={`form__input ${meta.error
                          && meta.touched && 'error--color'}`}
                        placeholder="Email"
                        {...field}
                      />
                    );
                  }}
                </Field>
              </label>

              <button
                className={`btn ${!(formik.isValid && formik.dirty) ? '' : 'btn--primary'}`}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </button>
            </Form>
          );
        }, [formik.isValid, formik.dirty]);
      }}
    </Formik>
  );
};
