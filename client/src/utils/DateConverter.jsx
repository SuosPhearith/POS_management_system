const dateConverter = (databaseDate) => {
  // Create a new Date object representing the current date and time in Cambodia's time zone (ICT)
  const currentDateInCambodia = new Date(databaseDate);
  currentDateInCambodia.setUTCHours(currentDateInCambodia.getUTCHours()); // Adjust to UTC+7

  // Extract date components
  const currentYear = currentDateInCambodia.getFullYear();
  const currentMonth = currentDateInCambodia.getMonth() + 1; // Months are 0-based, so add 1
  const currentDay = currentDateInCambodia.getDate();

  // Extract time components
  const currentHour = currentDateInCambodia.getHours();
  const currentMinute = currentDateInCambodia.getMinutes();
  const currentSecond = currentDateInCambodia.getSeconds();

  // Format date and time
  const formattedDateTime = `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;

  return formattedDateTime;
};

export default dateConverter;
