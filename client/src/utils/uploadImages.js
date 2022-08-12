export const uploadImages = async (images) => {
  const imagesArr = [];
  for (const image of images) {
    const formData = new FormData();
    if (image.camera) {
      formData.append("file", image.camera);
    } else {
      formData.append("file", image);
    }
    formData.append("upload_preset", "y39vzqhi");
    formData.append("cloud_name", "dvqqepqsa");

    try {
      const res = await fetch(
        "  https://api.cloudinary.com/v1_1/dvqqepqsa/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const { public_id, secure_url } = data;
      imagesArr.push({ public_id, secure_url });
    } catch (err) {
      console.log(err.message);
    }
  }

  return imagesArr;
};
