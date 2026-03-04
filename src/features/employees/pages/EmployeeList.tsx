// ============================================================================
// EMPLOYEE LIST PAGE - Redesigned with new components
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hook';
import { employeeService } from '../../../services/employee.service';
import {
    setEmployees,
    setLoading,
    setError,
    removeEmployee,
} from '../employeeSlice';
import { showSuccess, showError } from '../../../utils/toast';
import type { Employee } from '../../../types/types';
import Table, { type Column } from '../../../components/common/Table';
import ActionDropdown, { type ActionItem } from '../../../components/common/ActionDropdown';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';

const EmployeeList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { employees, loading } = useAppSelector((state) => state.employee);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        loadEmployees(currentPage);
    }, [currentPage]);

    const loadEmployees = async (page = 1) => {
        try {
            dispatch(setLoading(true));
            const response = await employeeService.getAll({ page, pageSize: itemsPerPage });
            dispatch(setEmployees(response));

            // Update pagination info
            if (response.meta) {
                setTotalPages(response.meta.totalPages || 1);
                setTotalItems(response.meta.total || 0);
            }
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to load employees';
            dispatch(setError(errorMessage));
            showError(errorMessage);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await employeeService.delete(id);
            dispatch(removeEmployee(id));
            showSuccess('Employee deleted successfully');
            setDeleteConfirm(null);

            // Reload if current page is empty after delete
            if (employees.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                loadEmployees(currentPage);
            }
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to delete employee';
            showError(errorMessage);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getTypeBadgeVariant = (type: string) => {
        const variants: Record<string, 'primary' | 'secondary' | 'success' | 'warning'> = {
            pel: 'primary',
            dhar: 'secondary',
            ghodi: 'success',
            table: 'warning',
        };
        return variants[type] || 'neutral';
    };

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            pel: 'Pel',
            dhar: 'Dhar',
            ghodi: 'Ghodi',
            table: 'Table',
        };
        return labels[type] || type;
    };

    const getActions = (employee: Employee): ActionItem[] => [
        {
            label: 'Edit',
            onClick: () => navigate(`/employees/${employee.id}/edit`),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            label: 'Delete',
            onClick: () => setDeleteConfirm(employee.id),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            variant: 'danger',
        },
    ];

    const columns: Column<Employee>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (employee) => (
                <div className="font-medium text-gray-900">{employee.name}</div>
            ),
        },
        {
            key: 'type',
            header: 'Type',
            render: (employee) => (
                <Badge variant={getTypeBadgeVariant(employee.type)} dot>
                    {getTypeLabel(employee.type)}
                </Badge>
            ),
        },
        {
            key: 'phone',
            header: 'Phone',
            render: (employee) => (
                <span className="text-gray-600">{employee.phone || '-'}</span>
            ),
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (employee) => (
                <span className="text-gray-600">{formatDate(employee.createdAt)}</span>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (employee) => (
                <div className="flex justify-end">
                    <ActionDropdown actions={getActions(employee)} />
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage all employees including their name, type, and contact information.
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/employees/create')}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    >
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={employees}
                keyExtractor={(employee) => employee.id}
                loading={loading}
                emptyMessage="No employees found. Create your first employee!"
            />

            {/* Pagination */}
            {!loading && employees.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                />
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Delete Employee"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this employee? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <Button
                            variant="ghost"
                            onClick={() => setDeleteConfirm(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EmployeeList;
