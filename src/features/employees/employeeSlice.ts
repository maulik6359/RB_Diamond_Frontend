// ============================================================================
// EMPLOYEE SLICE - REDUX STATE MANAGEMENT
// ============================================================================

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee, PaginationMeta } from '../../types/types';

interface EmployeeState {
    employees: Employee[];
    currentEmployee: Employee | null;
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
}

const initialState: EmployeeState = {
    employees: [],
    currentEmployee: null,
    loading: false,
    error: null,
    pagination: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },

        clearError(state) {
            state.error = null;
        },

        setEmployees(state, action: PayloadAction<{ data: Employee[]; meta: PaginationMeta }>) {
            state.employees = action.payload.data;
            state.pagination = action.payload.meta;
            state.loading = false;
            state.error = null;
        },

        setCurrentEmployee(state, action: PayloadAction<Employee | null>) {
            state.currentEmployee = action.payload;
        },

        addEmployee(state, action: PayloadAction<Employee>) {
            state.employees.unshift(action.payload);
        },

        updateEmployee(state, action: PayloadAction<Employee>) {
            const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
            if (state.currentEmployee?.id === action.payload.id) {
                state.currentEmployee = action.payload;
            }
        },

        removeEmployee(state, action: PayloadAction<string>) {
            state.employees = state.employees.filter((emp) => emp.id !== action.payload);
            if (state.currentEmployee?.id === action.payload) {
                state.currentEmployee = null;
            }
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    setEmployees,
    setCurrentEmployee,
    addEmployee,
    updateEmployee,
    removeEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
