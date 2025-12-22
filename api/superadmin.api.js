import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL


export async function handleSuperadminLogin(loginData) {
    const res = await axios.post(`${baseUrl}/api/superadmin/login`,loginData,{
        withCredentials: true
    })
    return res.data;
}


export async function handleGetMe(){
    const res = await axios.get(`${baseUrl}/api/superadmin/me`,{
        withCredentials:true
    })
    return res.data;
}

export async function handleSuperadminLogout(){
    const res = await axios.post(`${baseUrl}/api/superadmin/logout`,{},{
        withCredentials:true
    })
    return res.data;
}


export async function handleCreateTenants(tenantData){
    const res = await axios.post(`${baseUrl}/api/superadmin/create-tenant`,tenantData,{
        withCredentials:true
    })
    return res?.data;
}

export async function handleGetAllTenants(){
    const res = await axios.get(`${baseUrl}/api/superadmin/all-tenants`,{
        withCredentials:true
    })
    return res?.data;
}

export async function handleGetSingleTenantById(tenantId) {
  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }

  const res = await axios.get(`${baseUrl}/api/superadmin/tenant/${tenantId}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
}


