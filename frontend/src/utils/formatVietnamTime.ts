export const formatVietnamTime = (dt: Date) => {
    if (!dt) {
      console.error("Date is undefined or null");
      return "Invalid Date";
    }
  
    console.log("Before formatting:", dt);
    const formatted = new Date(dt)
      .toLocaleString('vi', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'Asia/Ho_Chi_Minh',
      })
      .split(' ')
      .reverse()
      .join(' ');
  
    console.log("After formatting:", formatted);
    return formatted;
  };
  