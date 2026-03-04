// ============================================================================
// AUTH VALIDATION SCHEMAS - YUP
// ============================================================================

import * as Yup from 'yup';

// ============================================================================
// LOGIN VALIDATION
// ============================================================================

export const loginValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(100, 'Username must not exceed 100 characters')
        .required('Username is required'),
    password: Yup.string().required('Password is required'),
});

// ============================================================================
// REGISTER VALIDATION
// ============================================================================

export const registerValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(100, 'Username must not exceed 100 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
            'Password must contain uppercase, lowercase, number, and special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
});
