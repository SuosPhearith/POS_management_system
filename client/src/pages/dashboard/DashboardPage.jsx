import React from "react";
import image from "../../images/dashboard.png";

const DashboardPage = () => {
  const divStyle = {
    width: "85%",
    height: "98%",
  };
  const divStyle2 = {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div style={divStyle2}>
      <div style={divStyle}>
        <img
          src={image}
          alt="Description"
          style={{
            width: "100%", // Set a fixed width for the container
            height: "100%", // Set a fixed height for the container
            objectFit: "cover", // Apply the object-fit property
          }}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
