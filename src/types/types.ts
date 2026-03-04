// ============================================================================
// TYPE DEFINITIONS - API ENTITIES
// ============================================================================

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
    id: string;
    username: string;
    email: string;
    phone?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    phone?: string;
}

export interface AuthResponse {
    data: {
        user: User;
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    },
    meta: any
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

// ============================================================================
// EMPLOYEE TYPES
// ============================================================================

export type EmployeeType = 'pel' | 'dhar' | 'ghodi' | 'table';

export interface Employee {
    id: string;
    name: string;
    type: EmployeeType;
    phone?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEmployeeRequest {
    name: string;
    type: EmployeeType;
    phone?: string;
}

export interface UpdateEmployeeRequest {
    name?: string;
    type?: EmployeeType;
    phone?: string;
}

// ============================================================================
// PACKET TYPES
// ============================================================================

export type PacketStatus = 'created' | 'assigned' | 'done' | 'reviewed';

export interface Packet {
    id: string;
    userId: string;
    employeeId?: string | null;
    status: PacketStatus;
    description?: string | null;
    weight?: string | null;
    carat?: string | null;
    createdAt: string;
    updatedAt: string;
    employee?: Employee;
    user?: User;
}

export interface CreatePacketRequest {
    description?: string;
    weight?: number;
    carat?: number;
}

export interface UpdatePacketRequest {
    description?: string;
    weight?: number;
    carat?: number;
}

export interface AssignPacketRequest {
    employeeId: string;
}

export interface UpdatePacketStatusRequest {
    status: PacketStatus;
}

export interface PacketStatusSummary {
    created: number;
    assigned: number;
    done: number;
    reviewed: number;
    total: number;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PaginationParams {
    page?: number;
    pageSize?: number;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: any;
}
// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardStats {
    total: number;
    byStatus: {
        created: number;
        assigned: number;
        done: number;
        reviewed: number;
    };
}

export interface DashboardData {
    stats: DashboardStats;
    packets: Packet[];
}
