export const truncateText = (text: string, maxLength: number = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const formatResponse = (text: string) => {
  return text
    .replace(/^\s*\*\s+(\*\*.*?\*\*)/gm, "$1")
    .replace(/^\s*\*\s+/gm, "") 
    .replace(/\*\*/g, ""); 
};
