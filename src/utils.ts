export const revalidateDuration = 60 * 60 * 24 * 7;

export const isValidImageSrc = (src: string) => {
  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
};
