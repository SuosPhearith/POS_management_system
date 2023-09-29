const getFormattedDateInCambodia = () => {
  const currentDateInCambodia = new Date();
  currentDateInCambodia.setUTCHours(currentDateInCambodia.getUTCHours() + 7); // Adjust to UTC+7

  // Format the `currentDateInCambodia` as a string in the DATETIME format (MySQL)
  const formattedDate = currentDateInCambodia
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedDate;
};
module.exports = getFormattedDateInCambodia;
