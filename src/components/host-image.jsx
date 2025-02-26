import axios from 'axios';

const uploadImageToImgBB = async (imageFile) => {
  try {
    // Ensure the API key exists in the environment variables
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      console.error('ImgBB API key is missing.');
      return null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('key', apiKey);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Check if the response contains the URL
    if (response.data?.data?.url) {
      return response.data.data.url;
    } else {
      console.error('ImgBB response does not contain the expected URL:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error);
    return null;
  }
};

export default uploadImageToImgBB;
