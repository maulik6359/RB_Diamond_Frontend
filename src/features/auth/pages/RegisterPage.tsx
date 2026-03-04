// ============================================================================
// REGISTER PAGE
// ============================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../../../validators/authValidation';
import { authService } from '../../../services/auth.service';
import { useAppDispatch } from '../../../app/store/hook';
import { login, setLoading, setError } from '../authSlice';
import { showSuccess, showError } from '../../../utils/toast';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const { confirmPassword, ...registerData } = values;
      const response = await authService.register(registerData);

      dispatch(login({
        user: response.user,
        token: response.tokens.accessToken,
        refreshToken: response.tokens.refreshToken,
      }));

      showSuccess('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error?.message || 'Registration failed. Please try again.';
      dispatch(setError(errorMessage));
      showError(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </a>
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="appearance-none relative block w-full text-gray-900 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="appearance-none relative block w-full text-gray-900 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    className="appearance-none relative block w-full text-gray-900 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="appearance-none relative block w-full text-gray-900 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must contain uppercase, lowercase, number, and special character
                  </p>
                </div>

                <div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="appearance-none relative block w-full text-gray-900 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;

