// ============================================================================
// CLIENT LIST PAGE
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import {
    setClients,
    setLoading,
    setError,
    removeClient,
} from "../clientSlice";
import { clientService } from "../../../services/client.service";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";

const ClientList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { clients, loading, pagination } = useAppSelector(
        (state) => state.client
    );
    const [currentPage, setCurrentPage] = useState(1);

    const fetchClients = async (page: number) => {
        dispatch(setLoading(true));
        try {
            const response = await clientService.getAll({ page, pageSize: 10 });
            dispatch(setClients(response));
        } catch (err: any) {
            dispatch(setError(err.message || "Failed to fetch clients"));
            toast.error(err.message || "Failed to fetch clients");
        }
    };

    useEffect(() => {
        fetchClients(currentPage);
    }, [currentPage]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                await clientService.delete(id);
                dispatch(removeClient(id));
                toast.success("Client deleted successfully");
            } catch (err: any) {
                toast.error(err.message || "Failed to delete client");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                    <p className="text-gray-500">Manage your client relationships</p>
                </div>
                <Button variant="primary" onClick={() => navigate("/clients/create")}>
                    <span className="mr-2">+</span> Add Client
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Client Name
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading && clients.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                        Loading clients...
                                    </td>
                                </tr>
                            ) : clients.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                        No clients found. Add your first client to get started.
                                    </td>
                                </tr>
                            ) : (
                                clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{client.name}</div>
                                            <div className="text-xs text-gray-400">ID: {client.id.substring(0, 8)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{client.email || "No email"}</div>
                                            <div className="text-sm text-gray-500">{client.phone || "No phone"}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 truncate max-w-xs">
                                                {client.address || "No address"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination && pagination.totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-700">{clients.length}</span> of{" "}
                            <span className="font-medium text-gray-700">{pagination.total}</span> clients
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={currentPage === pagination.totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientList;
