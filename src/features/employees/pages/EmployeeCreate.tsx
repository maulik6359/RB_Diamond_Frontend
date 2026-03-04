// ============================================================================
// EMPLOYEE CREATE PAGE - Redesigned with Card component
// ============================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hook';
import { employeeService } from '../../../services/employee.service';
import { addEmployee } from '../employeeSlice';
import { showSuccess, showError } from '../../../utils/toast';
import EmployeeForm from '../components/EmployeeForm';
import Card from '../../../components/common/Card';
import type { CreateEmployeeRequest } from '../../../types/types';

const EmployeeCreate: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: CreateEmployeeRequest) => {
        try {
            const newEmployee = await employeeService.create(values);
            dispatch(addEmployee(newEmployee));
            showSuccess('Employee created successfully');
            navigate('/employees');
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to create employee';
            showError(errorMessage);
            throw error;
        }
    };

    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div>
            {/* Breadcrumb */}
            <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <button onClick={() => navigate('/employees')} className="hover:text-indigo-600">
                            Employees
                        </button>
                    </li>
                    <li>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </li>
                    <li className="text-gray-900 font-medium">Create Employee</li>
                </ol>
            </nav>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create Employee</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Add a new employee to your organization.
                </p>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl">
                <EmployeeForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Card>
        </div>
    );
};

export default EmployeeCreate;
