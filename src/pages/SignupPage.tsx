import {Form, FormFieldConfig, FormCard} from '../components/Form';

export const SignupPage = () => {
  // TODO: Add react-hook-form logic here
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle signup logic
    console.log('Signup submitted');
  };

  const fieldConfig: FormFieldConfig[] = [
    {
      name: 'username',
      labelText: 'signup.username.label',
      placeholderText: 'signup.username.placeholder',
      required: true,
    },
    {
      name: 'password',
      labelText: 'signup.password.label',
      placeholderText: 'signup.password.placeholder',
      type: 'password',
      required: true,
    },
    {
      name: 'confirmPassword',
      labelText: 'signup.confirmPassword.label',
      placeholderText: 'signup.confirmPassword.placeholder',
      type: 'password',
      required: true,
    },
  ];

  return (
    <FormCard titleKey="signup.title" descriptionKey="signup.description">
      <Form onSubmit={handleSubmit} formFields={fieldConfig} submitButtonText="signup.button" />
    </FormCard>
  );
};
