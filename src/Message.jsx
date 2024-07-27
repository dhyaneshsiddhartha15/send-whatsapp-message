import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MessageForm = () => {
  const initialValues = {
    token: '',
    phoneNumberId: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    token: Yup.string().required('Token is required'),
    phoneNumberId: Yup.string().required('Phone Number ID is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{12}$/, 'Phone number must be exactly 12 digits')
      .required('Phone number is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('http://localhost:8001/api/send-text-message', {
        token: values.token,
        phoneNumberId: values.phoneNumberId,
        phoneNumber: values.phoneNumber,
      });
      console.log(response.data);
      setStatus({ success: true });
    } catch (error) {
      console.error(error);
      setStatus({ success: false, message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Send WhatsApp Message</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700">Access Token</label>
              <Field
                type="text"
                name="token"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="token" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phoneNumberId" className="block text-sm font-medium text-gray-700">Phone Number ID</label>
              <Field
                type="text"
                name="phoneNumberId"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="phoneNumberId" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">To Phone Number</label>
              <Field
                type="text"
                name="phoneNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm"
            >
              Send Message
            </button>

            {status && status.success && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
                Message sent successfully!
              </div>
            )}

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
