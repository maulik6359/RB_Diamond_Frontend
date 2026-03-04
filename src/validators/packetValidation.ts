// ============================================================================
// PACKET VALIDATION SCHEMAS - YUP
// ============================================================================

import * as Yup from 'yup';

// ============================================================================
// CREATE PACKET VALIDATION
// ============================================================================

export const createPacketValidationSchema = Yup.object({
    clientId: Yup.string()
        .required('Client is required'),
    description: Yup.string()
        .max(2000, 'Description must not exceed 2000 characters')
        .optional(),
    weight: Yup.number()
        .positive('Weight must be a positive number')
        .optional(),
    carat: Yup.number()
        .positive('Carat must be a positive number')
        .optional(),
    tyareWeight: Yup.number()
        .positive('Tyare weight must be a positive number')
        .optional(),
    color: Yup.string()
        .max(50, 'Color must not exceed 50 characters')
        .optional(),
    kasuWeight: Yup.number()
        .positive('Kasu weight must be a positive number')
        .optional()
        .test('kasu-vs-tyare', 'Kasu weight cannot be greater than Tyare weight', function (value) {
            const { tyareWeight } = this.parent;
            if (value !== undefined && tyareWeight !== undefined && value > tyareWeight) {
                return false;
            }
            return true;
        }),
    peroty: Yup.number()
        .positive('Peroty must be a positive number')
        .optional(),
    shape: Yup.string()
        .max(50, 'Shape must not exceed 50 characters')
        .optional(),
    cut: Yup.string()
        .max(50, 'Cut must not exceed 50 characters')
        .optional(),
    polishWeight: Yup.number()
        .positive('Polish weight must be a positive number')
        .optional(),
});

// ============================================================================
// UPDATE PACKET VALIDATION
// ============================================================================

export const updatePacketValidationSchema = Yup.object({
    clientId: Yup.string().optional(),
    description: Yup.string()
        .max(2000, 'Description must not exceed 2000 characters')
        .optional(),
    weight: Yup.number()
        .positive('Weight must be a positive number')
        .optional(),
    carat: Yup.number()
        .positive('Carat must be a positive number')
        .optional(),
    tyareWeight: Yup.number()
        .positive('Tyare weight must be a positive number')
        .optional(),
    color: Yup.string()
        .max(50, 'Color must not exceed 50 characters')
        .optional(),
    kasuWeight: Yup.number()
        .positive('Kasu weight must be a positive number')
        .optional()
        .test('kasu-vs-tyare', 'Kasu weight cannot be greater than Tyare weight', function (value) {
            const { tyareWeight } = this.parent;
            if (value !== undefined && tyareWeight !== undefined && value > tyareWeight) {
                return false;
            }
            return true;
        }),
    peroty: Yup.number()
        .positive('Peroty must be a positive number')
        .optional(),
    shape: Yup.string()
        .max(50, 'Shape must not exceed 50 characters')
        .optional(),
    cut: Yup.string()
        .max(50, 'Cut must not exceed 50 characters')
        .optional(),
    polishWeight: Yup.number()
        .positive('Polish weight must be a positive number')
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
