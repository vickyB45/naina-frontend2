import { handleCreateTenants } from "@/api/superadmin.api"
import { ConstructionTwoTone } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"




export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleCreateTenants,

    onSuccess: (data) => {
      toast.success(data?.message || "Tenant created successfully");

      // 🔥 sirf superadmin tenants refresh
      queryClient.invalidateQueries({
        queryKey: ["superadmin:tenants"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create tenant"
      );
    },
  });
};
