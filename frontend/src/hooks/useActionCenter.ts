import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import type {
  ActionCenterResponse,
  TaskStatus,
  UpdateTaskStatusRequest,
  UseActionCenterState,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";


export const useActionCenter = (studentId: string) => {
  const requestSeqRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<UseActionCenterState>({
    data: null,
    loading: true,
    isRefreshing: false,
    error: null,
  });


  const fetchActionCenter = useCallback(async () => {
    const requestSeq = ++requestSeqRef.current;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((prev) => ({
      data: prev.data,
      loading: prev.data === null,
      isRefreshing: prev.data !== null,
      error: null,
    }));

    try {
      const response = await axios.get<ActionCenterResponse>(
        `${API_BASE}/students/${studentId}/action-center`,
        { signal: controller.signal }
      );

      if (requestSeq !== requestSeqRef.current) {
        return;
      }

      setState({
        data: response.data,
        loading: false,
        isRefreshing: false,
        error: null,
      });
    } catch (err) {
      if (requestSeq !== requestSeqRef.current) {
        return;
      }

      if (axios.isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch student data";
      setState((prev) => ({
        data: prev.data,
        loading: false,
        isRefreshing: false,
        error: errorMessage,
      }));
    }
  }, [studentId]);


  const updateTaskStatus = useCallback(
    async (taskId: string, newStatus: TaskStatus) => {
      try {
        const payload: UpdateTaskStatusRequest = {
          status: newStatus,
        };

        await axios.patch(`${API_BASE}/tasks/${taskId}/status`, payload);

        await fetchActionCenter();
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update task status";
        setState((prev) => ({
          ...prev,
          error: errorMessage,
        }));
        return false;
      }
    },
    [fetchActionCenter]
  );

  useEffect(() => {
    fetchActionCenter();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchActionCenter]);

  return {
    ...state,
    updateTaskStatus,
    refetch: fetchActionCenter,
  };
};
