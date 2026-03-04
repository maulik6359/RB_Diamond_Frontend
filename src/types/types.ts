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
    user: User;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
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
// CLIENT TYPES
// ============================================================================

export interface Client {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateClientRequest {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface UpdateClientRequest {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

// ============================================================================
// PACKET TYPES
// ============================================================================

export type PacketStatus = 'created' | 'assigned' | 'done' | 'reviewed';

export interface Packet {
    id: string;
    userId: string;
    employeeId?: string | null;
    clientId?: string | null;
    status: PacketStatus;
    description?: string | null;
    weight?: string | null;
    carat?: string | null;
    tyareWeight?: string | null;
    color?: string | null;
    kasuWeight?: string | null;
    peroty?: string | null;
    shape?: string | null;
    cut?: string | null;
    polishWeight?: string | null;
    createdAt: string;
    updatedAt: string;
    client?: Client;
    employee?: Employee;
    user?: User;
}

export interface CreatePacketRequest {
    clientId: string;
    description?: string;
    weight?: number;
    carat?: number;
    tyareWeight?: number;
    color?: string;
    kasuWeight?: number;
    peroty?: number;
    shape?: string;
    cut?: string;
    polishWeight?: number;
}

export interface UpdatePacketRequest {
    clientId?: string;
    description?: string;
    weight?: number;
    carat?: number;
    tyareWeight?: number;
    color?: string;
    kasuWeight?: number;
    peroty?: number;
    shape?: string;
    cut?: string;
    polishWeight?: number;
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
    meta?: any;
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
