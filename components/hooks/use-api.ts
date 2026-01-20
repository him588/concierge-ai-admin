import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRoom,
  createRoomType,
  getRooms,
  getRoomTypes,
  getServicesInfo,
  getStaffInfo,
} from "@/components/api/api";
import { CreateRoomTypePayload } from "../types/types";

export const useGetRoomTypes = () => {
  return useQuery({
    queryKey: ["room-types"],
    queryFn: () => getRoomTypes(),
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: CreateRoomTypePayload) => createRoomType(roomType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room-types"] });
    },
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createRoom(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });
};

export const useGetServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => getServicesInfo(),
  });
};

export const useGetStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: () => getStaffInfo(),
  });
};
