export const getMenuData = async () => {
  const response = await fetch("https://localhost:44364/api/Menu/GetMenus");

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  return response.json();
};
