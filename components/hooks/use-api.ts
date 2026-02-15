import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  bookRoom,
  createRoom,
  createRoomType,
  getRooms,
  getRoomStatus,
  getRoomTypes,
  getServicesInfo,
  getStaffInfo,
} from "@/components/api/api";
import { BookRoomPlayload, CreateRoomTypePayload } from "../types/types";

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
      queryClient.invalidateQueries({ queryKey: ["room-status"] }); // ✅ add this
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

export const useBookRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: BookRoomPlayload) => bookRoom(bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useRoomBooking = () => {
  return useQuery({
    queryKey: ["room-status"],
    queryFn: () => getRoomStatus(),
  });
};

export const useCreateServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};
