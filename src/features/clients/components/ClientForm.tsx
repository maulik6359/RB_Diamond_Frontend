// ============================================================================
// CLIENT FORM COMPONENT - Floating labels
// ============================================================================

import React from "react";
import { Formik, Form } from "formik";
import {
    createClientValidationSchema,
    updateClientValidationSchema,
} from "../../../validators/clientValidation";
import type { Client, CreateClientRequest } from "../../../types/types";
import Button from "../../../components/common/Button";

interface ClientFormProps {
    initialValues?: Client;
    onSubmit: (values: CreateClientRequest) => Promise<void>;
    onCancel: () => void;
    isEdit?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    isEdit = false,
}) => {
    console.log("initialValues", initialValues);

    const formInitialValues: CreateClientRequest = initialValues
        ? {
            name: initialValues.name || "",
            email: initialValues.email || "",
            phone: initialValues.phone || "",
            address: initialValues.address || "",
        }
        : {
            name: "",
            email: "",
            phone: "",
            address: "",
        };

    return (
        <Formik
            initialValues={formInitialValues}
            enableReinitialize={true}
            validationSchema={
                isEdit ? updateClientValidationSchema : createClientValidationSchema
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
                            className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.name && touched.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.name
                                ? "top-2 text-xs text-gray-500"
                                : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Client Name
                        </label>
                        {errors.name && touched.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.email && touched.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.email
                                ? "top-2 text-xs text-gray-500"
                                : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Email Address (Optional)
                        </label>
                        {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.phone && touched.phone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="phone"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.phone
                                ? "top-2 text-xs text-gray-500"
                                : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Phone Number (Optional)
                        </label>
                        {errors.phone && touched.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="relative">
                        <textarea
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={3}
                            className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${errors.address && touched.address
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="address"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.address
                                ? "top-2 text-xs text-gray-500"
                                : "top-4 text-base text-gray-400"
                                }`}
                        >
                            Address (Optional)
                        </label>
                        {errors.address && touched.address && (
                            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isSubmitting}>
                            {isEdit ? "Update Client" : "Create Client"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ClientForm;
