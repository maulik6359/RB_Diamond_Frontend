// ============================================================================
// CLIENT EDIT PAGE
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/hook";
import { updateClient } from "../clientSlice";
import { clientService } from "../../../services/client.service";
import ClientForm from "../components/ClientForm";
import type { Client, CreateClientRequest } from "../../../types/types";
import { toast } from "react-toastify";

const ClientEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            if (!id) return;
            try {
                const data = await clientService.getById(id);
                setClient(data);
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch client details");
                navigate("/clients");
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id, navigate]);

    const handleSubmit = async (values: CreateClientRequest) => {
        if (!id) return;
        try {
            const updatedData = await clientService.update(id, values);
            dispatch(updateClient(updatedData));
            toast.success("Client updated successfully!");
            navigate("/clients");
        } catch (err: any) {
            toast.error(err.message || "Failed to update client");
            throw err;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading client data...</div>
            </div>
        );
    }

    if (!client) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Client</h1>
                <p className="text-gray-500">Update the information for {client.name}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <ClientForm
                    initialValues={client}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/clients")}
                    isEdit={true}
                />
            </div>
        </div>
    );
};

export default ClientEdit;
