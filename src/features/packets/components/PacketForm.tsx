// ============================================================================
// PACKET FORM COMPONENT - Redesigned with floating labels
// ============================================================================

import React from "react";
import { Formik, Form } from "formik";
import {
  createPacketValidationSchema,
  updatePacketValidationSchema,
} from "../../../validators/packetValidation";
import type { Packet, CreatePacketRequest } from "../../../types/types";
import Button from "../../../components/common/Button";

interface PacketFormProps {
  initialValues?: Packet;
  onSubmit: (values: CreatePacketRequest) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const PacketForm: React.FC<PacketFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const formInitialValues: CreatePacketRequest = initialValues
    ? {
        description: initialValues.description || "",
        weight: initialValues.weight
          ? parseFloat(initialValues.weight)
          : undefined,
        carat: initialValues.carat
          ? parseFloat(initialValues.carat)
          : undefined,
      }
    : {
        description: "",
        weight: undefined,
        carat: undefined,
      };

  return (
    <Formik
      initialValues={formInitialValues}
      enableReinitialize={true}
      validationSchema={
        isEdit ? updatePacketValidationSchema : createPacketValidationSchema
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
          {/* Description Field */}
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                errors.description && touched.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="description"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                values.description
                  ? "top-2 text-xs text-gray-500"
                  : "top-4 text-base text-gray-400"
              }`}
            >
              Description (Optional)
            </label>
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Weight Field */}
          <div className="relative">
            <input
              id="weight"
              name="weight"
              type="number"
              step="0.01"
              value={values.weight || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.weight && touched.weight
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="weight"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                values.weight
                  ? "top-2 text-xs text-gray-500"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-400"
              }`}
            >
              Weight (Optional)
            </label>
            {errors.weight && touched.weight && (
              <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
            )}
          </div>

          {/* Carat Field */}
          <div className="relative">
            <input
              id="carat"
              name="carat"
              type="number"
              step="0.01"
              value={values.carat || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.carat && touched.carat
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="carat"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                values.carat
                  ? "top-2 text-xs text-gray-500"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-400"
              }`}
            >
              Carat (Optional)
            </label>
            {errors.carat && touched.carat && (
              <p className="mt-1 text-sm text-red-600">{errors.carat}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isSubmitting}>
              {isEdit ? "Update Packet" : "Create Packet"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PacketForm;
