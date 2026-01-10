import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoomType, getRoomTypes } from "@/components/api/api";
import { CreateRoomTypePayload } from "../types/types";

export const useGetRoomTypes = () => {
  return useQuery({
    queryKey: ["room-types"],
    queryFn: async () => {
      const res = await getRoomTypes();
      return res?.data;
    },
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomType: CreateRoomTypePayload) => createRoomType(roomType),
    onSuccess: () => {
      // 🔁 Refetch room types after create
      queryClient.invalidateQueries({ queryKey: ["room-types"] });
    },
  });
};
