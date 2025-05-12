// 13자 넘어가면 말줄임표 처리
const truncateText = (text, maxLength = 13) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default truncateText;
