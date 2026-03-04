// ============================================================================
// PACKET LIST PAGE - Redesigned with new components
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import { packetService } from "../../../services/packet.service";
import { employeeService } from "../../../services/employee.service";
import {
  setPackets,
  setLoading,
  setError,
  removePacket,
  updatePacket as updatePacketAction,
  setFilters,
} from "../packetSlice";
import { showSuccess, showError } from "../../../utils/toast";
import AssignPacketModal from "../components/AssignPacketModal";
import UpdateStatusModal from "../components/UpdateStatusModal";
import type {
  Packet,
  PacketStatus,
  AssignPacketRequest,
  UpdatePacketStatusRequest,
} from "../../../types/types";
import Table, { type Column } from "../../../components/common/Table";
import ActionDropdown, {
  type ActionItem,
} from "../../../components/common/ActionDropdown";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Pagination from "../../../components/common/Pagination";

const PacketList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { packets, loading, filters } = useAppSelector((state) => state.packet);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const [statusModal, setStatusModal] = useState<{
    id: string;
    status: PacketStatus;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPackets(currentPage);
  }, [filters, currentPage]);

  const loadPackets = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = filters.status
        ? await packetService.getByStatus(filters.status, {
            page,
            pageSize: itemsPerPage,
          })
        : await packetService.getAll({ page, pageSize: itemsPerPage });
      dispatch(setPackets(response));

      // Update pagination info
      if (response.meta) {
        setTotalPages(response.meta.totalPages || 1);
        setTotalItems(response.meta.total || 0);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to load packets";
      dispatch(setError(errorMessage));
      showError(errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await packetService.delete(id);
      dispatch(removePacket(id));
      showSuccess("Packet deleted successfully");
      setDeleteConfirm(null);

      // Reload if current page is empty after delete
      if (packets.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        loadPackets(currentPage);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to delete packet";
      showError(errorMessage);
    }
  };

  const handleAssign = async (data: AssignPacketRequest) => {
    if (!assignModal) return;

    try {
      const updatedPacket = await packetService.assign(assignModal, data);

      // the API sometimes returns only the id of the employee instead of
      // the full employee object; merge existing details or fetch if needed
      let packetToStore = updatedPacket;
      if (!packetToStore.employee || !packetToStore.employee.name) {
        try {
          const emp = await employeeService.getById(data.employeeId);
          packetToStore = { ...updatedPacket, employee: emp };
        } catch {
          // if fetching fails we at least keep whatever the backend returned
        }
      }

      dispatch(updatePacketAction(packetToStore));
      loadPackets(currentPage);
      showSuccess("Packet assigned successfully");
      setAssignModal(null);
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to assign packet";
      showError(errorMessage);
      throw error;
    }
  };

  const handleUpdateStatus = async (data: UpdatePacketStatusRequest) => {
    if (!statusModal) return;

    try {
      const updatedPacket = await packetService.updateStatus(
        statusModal.id,
        data,
      );

      // merge with existing state so fields like employee are preserved
      let packetToStore = updatedPacket;
      const existing = packets.find((p) => p.id === statusModal.id);
      if (existing) {
        packetToStore = { ...existing, ...updatedPacket };
      }

      dispatch(updatePacketAction(packetToStore));
      loadPackets(currentPage);
      showSuccess("Packet status updated successfully");
      setStatusModal(null);
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to update status";
      showError(errorMessage);
      throw error;
    }
  };

  const handleFilterChange = (status: PacketStatus | "") => {
    dispatch(setFilters({ status: status || undefined }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status: PacketStatus) => {
    const variants: Record<
      PacketStatus,
      "neutral" | "primary" | "success" | "warning"
    > = {
      created: "neutral",
      assigned: "primary",
      done: "success",
      reviewed: "warning",
    };
    return variants[status];
  };

  const getActions = (packet: Packet): ActionItem[] => [
    {
      label: "Edit",
      onClick: () => navigate(`/packets/${packet.id}/edit`),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      label: "Assign",
      onClick: () => setAssignModal(packet.id),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      label: "Update Status",
      onClick: () => setStatusModal({ id: packet.id, status: packet.status }),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Delete",
      onClick: () => setDeleteConfirm(packet.id),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      variant: "danger",
    },
  ];

  const columns: Column<Packet>[] = [
    {
      key: "id",
      header: "ID",
      render: (packet) => (
        <span className="font-mono text-xs text-gray-600">
          {(packet.id ?? "").substring(0, 8)}
          {packet.id ? "..." : ""}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (packet) => (
        <div className="max-w-xs truncate text-gray-900">
          {packet.description || "-"}
        </div>
      ),
    },
    {
      key: "weight",
      header: "Weight",
      render: (packet) => (
        <span className="text-gray-600">{packet.weight || "-"}</span>
      ),
    },
    {
      key: "carat",
      header: "Carat",
      render: (packet) => (
        <span className="text-gray-600">{packet.carat || "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (packet) => (
        <Badge variant={getStatusBadgeVariant(packet.status)} dot>
          {packet.status.charAt(0).toUpperCase() + packet.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "employee",
      header: "Employee",
      render: (packet) => (
        <span className="text-gray-600">{packet.employee?.name || "-"}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (packet) => (
        <span className="text-gray-600">{formatDate(packet.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (packet) => (
        <div className="flex justify-end">
          <ActionDropdown actions={getActions(packet)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header with Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Packets</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage all packets including their status, employee assignment,
              and details.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/packets/create")}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Packet
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-700"
          >
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={filters.status || ""}
            onChange={(e) =>
              handleFilterChange(e.target.value as PacketStatus | "")
            }
            className="relative z-20 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            <option value="created">Created</option>
            <option value="assigned">Assigned</option>
            <option value="done">Done</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={packets}
        keyExtractor={(packet) => packet.id || "unknown"}
        loading={loading}
        emptyMessage="No packets found. Create your first packet!"
      />

      {/* Pagination */}
      {!loading && packets.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Packet"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this packet? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Assign Packet Modal */}
      {assignModal && (
        <AssignPacketModal
          onAssign={handleAssign}
          onClose={() => setAssignModal(null)}
        />
      )}

      {/* Update Status Modal */}
      {statusModal && (
        <UpdateStatusModal
          packetId={statusModal.id}
          currentStatus={statusModal.status}
          onUpdateStatus={handleUpdateStatus}
          onClose={() => setStatusModal(null)}
        />
      )}
    </div>
  );
};

export default PacketList;
