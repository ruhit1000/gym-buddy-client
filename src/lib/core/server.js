const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`,
  } : {};
  return header;
}

export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    cache: "no-store",
  });
  return res.json();
};


export const serverDelete = async (path) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "DELETE",
  });
  return res.json();
};