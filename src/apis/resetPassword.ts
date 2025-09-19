// apis/resetPassword.ts
export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to reset password");
  }

  return res.json();
}
