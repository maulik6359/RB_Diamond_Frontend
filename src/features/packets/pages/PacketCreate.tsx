// ============================================================================
// PACKET CREATE PAGE - Redesigned with Card component
// ============================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hook';
import { packetService } from '../../../services/packet.service';
import { addPacket } from '../packetSlice';
import { showSuccess, showError } from '../../../utils/toast';
import PacketForm from '../components/PacketForm';
import Card from '../../../components/common/Card';
import type { CreatePacketRequest } from '../../../types/types';

const PacketCreate: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: CreatePacketRequest) => {
        try {
            const newPacket = await packetService.create(values);
            dispatch(addPacket(newPacket));
            showSuccess('Packet created successfully');
            navigate('/packets');
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to create packet';
            showError(errorMessage);
            throw error;
        }
    };

    const handleCancel = () => {
        navigate('/packets');
    };

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
                    <li className="text-gray-900 font-medium">Create Packet</li>
                </ol>
            </nav>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create Packet</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Add a new packet to the system.
                </p>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl">
                <PacketForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Card>
        </div>
    );
};

export default PacketCreate;
