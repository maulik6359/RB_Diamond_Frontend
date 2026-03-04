// ============================================================================
// CLIENT CREATE PAGE
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/hook";
import { addClient, setClients } from "../clientSlice";
import { clientService } from "../../../services/client.service";
import ClientForm from "../components/ClientForm";
import type { CreateClientRequest } from "../../../types/types";
import { toast } from "react-toastify";

const ClientCreate: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: CreateClientRequest) => {
        try {
            const newClient = await clientService.create(values);
            dispatch(addClient(newClient));
            const response = await clientService.getAll({ page: 1, pageSize: 10 });
            dispatch(setClients(response));
            toast.success("Client created successfully!");
            navigate("/clients");
        } catch (err: any) {
            toast.error(err.message || "Failed to create client");
            throw err;
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
                <p className="text-gray-500">Complete the form below to register a new client</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <ClientForm onSubmit={handleSubmit} onCancel={() => navigate("/clients")} />
            </div>
        </div>
    );
};

export default ClientCreate;
