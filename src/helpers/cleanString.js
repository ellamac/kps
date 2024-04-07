export const cleanString = (name) => {
  // Remove extra spaces between words and trim leading/trailing spaces
  const spacesRemoved = name.replace(/\s+/g, ' ').trim();

  // Convert the name to uppercase
  const inUpperCase = spacesRemoved.toUpperCase();

  return inUpperCase;
};

export default cleanString;
