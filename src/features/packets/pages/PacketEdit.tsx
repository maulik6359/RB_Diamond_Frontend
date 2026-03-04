// ============================================================================
// PACKET EDIT PAGE - Redesigned with Card component
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hook';
import { packetService } from '../../../services/packet.service';
import { updatePacket as updatePacketAction } from '../packetSlice';
import { showSuccess, showError } from '../../../utils/toast';
import PacketForm from '../components/PacketForm';
import Card from '../../../components/common/Card';
import type { Packet, UpdatePacketRequest } from '../../../types/types';

const PacketEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [packet, setPacket] = useState<Packet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadPacket(id);
        }
    }, [id]);

    const loadPacket = async (packetId: string) => {
        try {
            setLoading(true);
            const data = await packetService.getById(packetId);
            setPacket(data);
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to load packet';
            showError(errorMessage);
            navigate('/packets');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: UpdatePacketRequest) => {
        if (!id) return;

        try {
            const updatedPacket = await packetService.update(id, values);
            dispatch(updatePacketAction(updatedPacket));
            showSuccess('Packet updated successfully');
            navigate('/packets');
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update packet';
            showError(errorMessage);
            throw error;
        }
    };

    const handleCancel = () => {
        navigate('/packets');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500">Loading packet...</p>
                </div>
            </div>
        );
    }

    if (!packet) {
        return null;
    }

    return (
        <div>
            {/* Breadcrumb */}
            <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <button onClick={() => navigate('/packets')} className="hover:text-indigo-600">
                            Packets
                        </button>
                    </li>
                    <li>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </li>
                    <li className="text-gray-900 font-medium">Edit Packet</li>
                </ol>
            </nav>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Packet</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Update packet information.
                </p>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl">
                <PacketForm
                    initialValues={packet}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEdit
                />
            </Card>
        </div>
    );
};

export default PacketEdit;
