import axios from 'axios';

export const patch = async (boothId, data, token) => {
  const formData = new FormData();

  if (data.thumbnail_image)
    formData.append('thumbnail_image', data.thumbnail_image);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('contact', data.contact);
  formData.append('is_opened', data.is_opened);

  const hours = JSON.stringify(data.operating_hours);
  formData.append('operating_hours', hours);

  try {
    const res = await axios.patch(`/booths/${boothId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export default {
  patch
};
