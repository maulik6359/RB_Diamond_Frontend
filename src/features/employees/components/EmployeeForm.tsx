// ============================================================================
// EMPLOYEE FORM COMPONENT - Redesigned with new Input and Button components
// ============================================================================

import React from "react";
import { Formik, Form } from "formik";
import {
  createEmployeeValidationSchema,
  updateEmployeeValidationSchema,
} from "../../../validators/employeeValidation";
import type {
  Employee,
  CreateEmployeeRequest,
  EmployeeType,
} from "../../../types/types";
import Button from "../../../components/common/Button";

interface EmployeeFormProps {
  initialValues?: Employee;
  onSubmit: (values: CreateEmployeeRequest) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const EMPLOYEE_TYPES: { value: EmployeeType; label: string }[] = [
  { value: "pel", label: "Pel" },
  { value: "dhar", label: "Dhar" },
  { value: "ghodi", label: "Ghodi" },
  { value: "table", label: "Table" },
];

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const formInitialValues: CreateEmployeeRequest = initialValues
    ? {
        name: initialValues.name,
        type: initialValues.type,
        phone: initialValues.phone || "",
      }
    : {
        name: "",
        type: "pel",
        phone: "",
      };

  return (
    <Formik
      initialValues={formInitialValues}
      enableReinitialize={true}
      validationSchema={
        isEdit ? updateEmployeeValidationSchema : createEmployeeValidationSchema
      }
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.name && touched.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                values.name
                  ? "top-2 text-xs text-gray-500"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-400"
              }`}
            >
              Name <span className="text-red-500">*</span>
            </label>
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Type Field */}
          <div className="relative">
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.type && touched.type
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            >
              {EMPLOYEE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="type"
              className="absolute left-4 top-2 text-xs text-gray-500 pointer-events-none"
            >
              Type <span className="text-red-500">*</span>
            </label>
            {errors.type && touched.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.phone && touched.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                values.phone
                  ? "top-2 text-xs text-gray-500"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-400"
              }`}
            >
              Phone (Optional)
            </label>
            {errors.phone && touched.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isSubmitting}>
              {isEdit ? "Update Employee" : "Create Employee"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
