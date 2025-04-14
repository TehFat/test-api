export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    try {

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          resolve(reader.result)
        },
        false,
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    } catch (error) {
      reject(error);
    }
  });
}