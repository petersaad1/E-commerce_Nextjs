export async function forgetPassword(email: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", // بدون s
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send reset link");
  }

  return data;
}
