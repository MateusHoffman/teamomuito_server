export const generateId = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function removeAccents(str: string) {
  // Normalize the string to NFD format and remove accents
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
