// ============================================================================
// ASSIGN PACKET MODAL - Redesigned with new Modal and Button components
// ============================================================================

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { assignPacketValidationSchema } from "../../../validators/packetValidation";
import { employeeService } from "../../../services/employee.service";
import { showError } from "../../../utils/toast";
import type { Employee, AssignPacketRequest } from "../../../types/types";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

interface AssignPacketModalProps {
  onAssign: (data: AssignPacketRequest) => Promise<void>;
  onClose: () => void;
}

const AssignPacketModal: React.FC<AssignPacketModalProps> = ({
  onAssign,
  onClose,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAll({ page: 1, pageSize: 100 });
      setEmployees(response.data);
    } catch (error: any) {
      showError(error?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const initialValues: AssignPacketRequest = {
    employeeId: "",
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Assign Packet to Employee"
      size="md"
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-3">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-sm text-gray-500">Loading employees...</p>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={assignPacketValidationSchema}
          onSubmit={onAssign}
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
              {/* Employee Select */}
              <div className="relative">
                <select
                  id="employeeId"
                  name="employeeId"
                  value={values.employeeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.employeeId && touched.employeeId
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.type})
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="employeeId"
                  className="absolute left-4 top-2 text-xs text-gray-500 pointer-events-none"
                >
                  Select Employee <span className="text-red-500">*</span>
                </label>
                {errors.employeeId && touched.employeeId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.employeeId}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" loading={isSubmitting}>
                  Assign
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default AssignPacketModal;
