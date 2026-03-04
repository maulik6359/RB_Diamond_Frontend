// ============================================================================
// PACKET VALIDATION SCHEMAS - YUP
// ============================================================================

import * as Yup from 'yup';

// ============================================================================
// CREATE PACKET VALIDATION
// ============================================================================

export const createPacketValidationSchema = Yup.object({
    description: Yup.string()
        .max(2000, 'Description must not exceed 2000 characters')
        .optional(),
    weight: Yup.number()
        .positive('Weight must be a positive number')
        .optional(),
    carat: Yup.number()
        .positive('Carat must be a positive number')
        .optional(),
});

// ============================================================================
// UPDATE PACKET VALIDATION
// ============================================================================

export const updatePacketValidationSchema = Yup.object({
    description: Yup.string()
        .max(2000, 'Description must not exceed 2000 characters')
        .optional(),
    weight: Yup.number()
        .positive('Weight must be a positive number')
        .optional(),
    carat: Yup.number()
        .positive('Carat must be a positive number')
        .optional(),
}).test('at-least-one', 'At least one field must be provided', (value) => {
    return Object.values(value).some((v) => v !== undefined && v !== '');
});

// ============================================================================
// ASSIGN PACKET VALIDATION
// ============================================================================

export const assignPacketValidationSchema = Yup.object({
    employeeId: Yup.string().required('Employee is required'),
});

// ============================================================================
// UPDATE STATUS VALIDATION
// ============================================================================

export const updateStatusValidationSchema = Yup.object({
    status: Yup.string()
        .oneOf(['created', 'assigned', 'done', 'reviewed'], 'Invalid status')
        .required('Status is required'),
});
