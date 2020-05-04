const FileHelper = {
  getBase64: (file, onLoaded) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoaded(reader.result);
    };
  },
};

export default FileHelper;
