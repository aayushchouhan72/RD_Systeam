const imageLoder = (BaseUrl, totalimages) => {
  const images = [];

  for (let i = 1; i <= totalimages; i++) {
    const img = new Image();

    const imageUrl = BaseUrl + String(i).padStart(4, "0") + ".jpg";

    img.src = imageUrl;
    images.push(img);
  }

  return images;
};

export default imageLoder;
