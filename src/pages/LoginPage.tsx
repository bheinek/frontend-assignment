import {Form, FormFieldConfig, FormCard} from '../components/Form';

export const LoginPage = () => {
  // TODO: Add react-hook-form logic here
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle login logic
    console.log('Login submitted');
  };

  const fieldConfig: FormFieldConfig[] = [
    {
      name: 'username',
      labelText: 'login.username.label',
      placeholderText: 'login.username.placeholder',
      required: true,
    },
    {
      name: 'password',
      labelText: 'login.password.label',
      placeholderText: 'login.password.placeholder',
      type: 'password',
      required: true,
    },
  ];

  return (
    <FormCard titleKey="login.title" descriptionKey="login.description">
      <Form onSubmit={handleSubmit} formFields={fieldConfig} submitButtonText="login.button" />
    </FormCard>
  );
};
