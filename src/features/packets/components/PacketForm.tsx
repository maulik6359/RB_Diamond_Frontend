// ============================================================================
// PACKET FORM COMPONENT - Redesigned with floating labels
// ============================================================================

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import {
  createPacketValidationSchema,
  updatePacketValidationSchema,
} from "../../../validators/packetValidation";
import type { Packet, CreatePacketRequest } from "../../../types/types";
import Button from "../../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import { setClients } from "../../clients/clientSlice";
import { clientService } from "../../../services/client.service";

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
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.client);

  useEffect(() => {
    const fetchClients = async () => {
      if (clients.length === 0) {
        try {
          const response = await clientService.getAll({ page: 1, pageSize: 100 });
          dispatch(setClients(response));
        } catch (err) {
          console.error("Failed to fetch clients", err);
        }
      }
    };
    fetchClients();
  }, [dispatch, clients.length]);

  const formInitialValues: CreatePacketRequest = initialValues
    ? {
      clientId: initialValues.clientId || "",
      description: initialValues.description || "",
      weight: initialValues.weight ? parseFloat(initialValues.weight) : undefined,
      carat: initialValues.carat ? parseFloat(initialValues.carat) : undefined,
      tyareWeight: initialValues.tyareWeight ? parseFloat(initialValues.tyareWeight) : undefined,
      color: initialValues.color || "",
      kasuWeight: initialValues.kasuWeight ? parseFloat(initialValues.kasuWeight) : undefined,
      peroty: initialValues.peroty ? parseFloat(initialValues.peroty) : undefined,
      shape: initialValues.shape || "",
      cut: initialValues.cut || "",
      polishWeight: initialValues.polishWeight ? parseFloat(initialValues.polishWeight) : undefined,
    }
    : {
      clientId: "",
      description: "",
      weight: undefined,
      carat: undefined,
      tyareWeight: undefined,
      color: "",
      kasuWeight: undefined,
      peroty: undefined,
      shape: "",
      cut: "",
      polishWeight: undefined,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Selection */}
            <div className="relative md:col-span-2">
              <select
                id="clientId"
                name="clientId"
                value={values.clientId}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none ${errors.clientId && touched.clientId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                required
              >
                <option value="" disabled>Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="clientId"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.clientId
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Client *
              </label>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.clientId && touched.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.clientId}</p>
              )}
            </div>

            {/* Tyare Weight */}
            <div className="relative">
              <input
                id="tyareWeight"
                name="tyareWeight"
                type="number"
                step="0.0001"
                value={values.tyareWeight || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.tyareWeight && touched.tyareWeight
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="tyareWeight"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.tyareWeight
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Tyare Weight
              </label>
              {errors.tyareWeight && touched.tyareWeight && (
                <p className="mt-1 text-sm text-red-600">{errors.tyareWeight}</p>
              )}
            </div>

            {/* Kasu Weight */}
            <div className="relative">
              <input
                id="kasuWeight"
                name="kasuWeight"
                type="number"
                step="0.0001"
                value={values.kasuWeight || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.kasuWeight && touched.kasuWeight
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="kasuWeight"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.kasuWeight
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Kasu Weight
              </label>
              {errors.kasuWeight && touched.kasuWeight && (
                <p className="mt-1 text-sm text-red-600">{errors.kasuWeight}</p>
              )}
            </div>

            {/* Color */}
            <div className="relative">
              <input
                id="color"
                name="color"
                type="text"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.color && touched.color
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="color"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.color
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Color
              </label>
              {errors.color && touched.color && (
                <p className="mt-1 text-sm text-red-600">{errors.color}</p>
              )}
            </div>

            {/* Shape */}
            <div className="relative">
              <input
                id="shape"
                name="shape"
                type="text"
                value={values.shape}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.shape && touched.shape
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="shape"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.shape
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Shape
              </label>
              {errors.shape && touched.shape && (
                <p className="mt-1 text-sm text-red-600">{errors.shape}</p>
              )}
            </div>

            {/* Cut */}
            <div className="relative">
              <input
                id="cut"
                name="cut"
                type="text"
                value={values.cut}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.cut && touched.cut
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="cut"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.cut
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Cut
              </label>
              {errors.cut && touched.cut && (
                <p className="mt-1 text-sm text-red-600">{errors.cut}</p>
              )}
            </div>

            {/* Peroty */}
            <div className="relative">
              <input
                id="peroty"
                name="peroty"
                type="number"
                step="0.01"
                value={values.peroty || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.peroty && touched.peroty
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="peroty"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.peroty
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Peroty
              </label>
              {errors.peroty && touched.peroty && (
                <p className="mt-1 text-sm text-red-600">{errors.peroty}</p>
              )}
            </div>

            {/* Polish Weight */}
            <div className="relative">
              <input
                id="polishWeight"
                name="polishWeight"
                type="number"
                step="0.0001"
                value={values.polishWeight || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.polishWeight && touched.polishWeight
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="polishWeight"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.polishWeight
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Polish Weight
              </label>
              {errors.polishWeight && touched.polishWeight && (
                <p className="mt-1 text-sm text-red-600">{errors.polishWeight}</p>
              )}
            </div>

            {/* Weight (Total) */}
            <div className="relative">
              <input
                id="weight"
                name="weight"
                type="number"
                step="0.0001"
                value={values.weight || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.weight && touched.weight
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="weight"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.weight
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Total Weight
              </label>
              {errors.weight && touched.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            {/* Carat */}
            <div className="relative">
              <input
                id="carat"
                name="carat"
                type="number"
                step="0.01"
                value={values.carat || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.carat && touched.carat
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="carat"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.carat
                    ? "top-2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400"
                  }`}
              >
                Carat
              </label>
              {errors.carat && touched.carat && (
                <p className="mt-1 text-sm text-red-600">{errors.carat}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="relative md:col-span-2">
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${errors.description && touched.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="description"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${values.description
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
