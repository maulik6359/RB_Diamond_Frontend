// ============================================================================
// PACKET SLICE - REDUX STATE MANAGEMENT
// ============================================================================

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Packet,
  PacketStatusSummary,
  PaginationMeta,
  PacketStatus,
} from "../../types/types";

interface PacketState {
  packets: Packet[];
  currentPacket: Packet | null;
  statusSummary: PacketStatusSummary | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
  filters: {
    status?: PacketStatus;
    search?: string;
  };
}

const initialState: PacketState = {
  packets: [],
  currentPacket: null,
  statusSummary: null,
  loading: false,
  error: null,
  pagination: null,
  filters: {},
};

const packetSlice = createSlice({
  name: "packet",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },

    clearError(state) {
      state.error = null;
    },

    setPackets(
      state,
      action: PayloadAction<{ data: Packet[]; meta: PaginationMeta }>,
    ) {
      state.packets = action.payload.data;
      state.pagination = action.payload.meta;
      state.loading = false;
      state.error = null;
    },

    setCurrentPacket(state, action: PayloadAction<Packet | null>) {
      state.currentPacket = action.payload;
    },

    setStatusSummary(state, action: PayloadAction<PacketStatusSummary>) {
      state.statusSummary = action.payload;
    },

    addPacket(state, action: PayloadAction<Packet>) {
      // only add if we have at least an id, otherwise ignore
      if (action.payload && action.payload.id) {
        state.packets.unshift(action.payload);
      }
    },

    updatePacket(state, action: PayloadAction<Packet>) {
      const index = state.packets.findIndex(
        (pkt) => pkt.id === action.payload.id,
      );
      if (index !== -1) {
        // merge so we don't accidentally wipe out existing nested data
        state.packets[index] = { ...state.packets[index], ...action.payload };
      }
      if (state.currentPacket?.id === action.payload.id) {
        state.currentPacket = { ...state.currentPacket, ...action.payload };
      }
    },

    removePacket(state, action: PayloadAction<string>) {
      state.packets = state.packets.filter((pkt) => pkt.id !== action.payload);
      if (state.currentPacket?.id === action.payload) {
        state.currentPacket = null;
      }
    },

    setFilters(
      state,
      action: PayloadAction<{ status?: PacketStatus; search?: string }>,
    ) {
      state.filters = action.payload;
    },

    clearFilters(state) {
      state.filters = {};
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPackets,
  setCurrentPacket,
  setStatusSummary,
  addPacket,
  updatePacket,
  removePacket,
  setFilters,
  clearFilters,
} = packetSlice.actions;

export default packetSlice.reducer;
