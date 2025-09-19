// apis/verifyResetCode.ts
export async function verifyResetCode(resetCode: string) {
  console.log("Sending body:", { resetCode });

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }), 
    }
  );

  const data = await res.json();
  console.log("Response:", data);

  if (!res.ok) {
    throw new Error(data.message || "Failed to verify code");
  }

  return data;
}
