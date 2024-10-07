export const formatVietnamTime = (dt: Date) => {
    if (!dt) {
      console.error("Date is undefined or null");
      return "Invalid Date";
    }

    const formatted = new Date(dt)
      .toLocaleString('vi', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'Asia/Ho_Chi_Minh',
      })
      .split(' ')
      .reverse()
      .join(' ');
  
    return formatted;
  };
  