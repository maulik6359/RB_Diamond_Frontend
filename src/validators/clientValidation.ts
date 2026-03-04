// ============================================================================
// CLIENT VALIDATION SCHEMAS - YUP
// ============================================================================

import * as Yup from 'yup';

// ============================================================================
// CREATE CLIENT VALIDATION
// ============================================================================

export const createClientValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name must not exceed 255 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .optional(),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
    address: Yup.string()
        .max(500, 'Address must not exceed 500 characters')
        .optional(),
});

// ============================================================================
// UPDATE CLIENT VALIDATION
// ============================================================================

export const updateClientValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name must not exceed 255 characters')
        .optional(),
    email: Yup.string()
        .email('Invalid email format')
        .optional(),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
    address: Yup.string()
        .max(500, 'Address must not exceed 500 characters')
        .optional(),
}).test('at-least-one', 'At least one field must be provided', (value) => {
    return Object.values(value).some((v) => v !== undefined && v !== '');
});
