// ============================================================================
// DASHBOARD TABLE COMPONENT
// ============================================================================

import React from "react";
import type { Packet, PacketStatus } from "../../../types/types";
import Table, { type Column } from "../../../components/common/Table";
import Badge from "../../../components/common/Badge";

interface DashboardTableProps {
  packets: Packet[];
}

const DashboardTable: React.FC<DashboardTableProps> = ({ packets }) => {
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
      key: "status",
      header: "Status",
      render: (packet) => (
        <Badge variant={getStatusBadgeVariant(packet.status)} dot>
          {packet.status.charAt(0).toUpperCase() + packet.status.slice(1)}
        </Badge>
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
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Packets
      </h2>
      <Table
        columns={columns}
        data={packets}
        keyExtractor={(packet) => packet.id || "unknown"}
        loading={false}
        emptyMessage="No packets found."
      />
    </div>
  );
};

export default DashboardTable;
