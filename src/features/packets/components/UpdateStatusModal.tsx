// ============================================================================
// UPDATE STATUS MODAL - Redesigned with new Modal and Button components
// ============================================================================

import React from "react";
import { Formik, Form } from "formik";
import { updateStatusValidationSchema } from "../../../validators/packetValidation";
import type {
  PacketStatus,
  UpdatePacketStatusRequest,
} from "../../../types/types";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

interface UpdateStatusModalProps {
  packetId: string;
  currentStatus: PacketStatus;
  onUpdateStatus: (data: UpdatePacketStatusRequest) => Promise<void>;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: PacketStatus; label: string }[] = [
  { value: "created", label: "Created" },
  { value: "assigned", label: "Assigned" },
  { value: "done", label: "Done" },
  { value: "reviewed", label: "Reviewed" },
];

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  currentStatus,
  onUpdateStatus,
  onClose,
}) => {
  const initialValues: UpdatePacketStatusRequest = {
    status: currentStatus,
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Update Packet Status"
      size="md"
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={updateStatusValidationSchema}
        onSubmit={onUpdateStatus}
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
            {/* Status Select */}
            <div className="relative">
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.status && touched.status
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label
                htmlFor="status"
                className="absolute left-4 top-2 text-xs text-gray-500 pointer-events-none"
              >
                Status <span className="text-red-500">*</span>
              </label>
              {errors.status && touched.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={isSubmitting}>
                Update Status
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateStatusModal;
