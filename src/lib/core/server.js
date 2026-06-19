const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};