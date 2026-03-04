// ============================================================================
// EMPLOYEE VALIDATION SCHEMAS - YUP
// ============================================================================

import * as Yup from 'yup';

// ============================================================================
// CREATE EMPLOYEE VALIDATION
// ============================================================================

export const createEmployeeValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name must not exceed 255 characters')
        .required('Name is required'),
    type: Yup.string()
        .oneOf(['pel', 'dhar', 'ghodi', 'table'], 'Invalid employee type')
        .required('Type is required'),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
});

// ============================================================================
// UPDATE EMPLOYEE VALIDATION
// ============================================================================

export const updateEmployeeValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name must not exceed 255 characters')
        .optional(),
    type: Yup.string()
        .oneOf(['pel', 'dhar', 'ghodi', 'table'], 'Invalid employee type')
        .optional(),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
}).test('at-least-one', 'At least one field must be provided', (value) => {
    return Object.values(value).some((v) => v !== undefined && v !== '');
});
