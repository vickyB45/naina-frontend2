import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function handleTenantLogin(loginData) {
  const res = await axios.post(`${baseUrl}/api/admin/login`, loginData, {
    withCredentials: true,
  });
  return res.data;
}

export async function handleAdminData() {
  const res = await axios.get(`${baseUrl}/api/admin/me`, {
    withCredentials: true,
  });
  return res.data;
}

export async function handleAdminLogout() {
  const res = await axios.post(
    `${baseUrl}/api/admin/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
}

export async function handleAdminOnboarding(onboardingData) {
  const res = await axios.patch(
    `${baseUrl}/api/admin/onboarding`,
    onboardingData,
    { withCredentials: true }
  );
  return res.data;
}
