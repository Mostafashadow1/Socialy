import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";
function ImageSlider({ images }) {
  // Start Styles
  const styledImageAndVideo = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const styledButton = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#f1f1f1",
    width: "30px",
    height: "30px",
    boxShadow: "5px 5px 20px #242424",
    opacity: 0.7,
    "&:hover": {
      backgroundColor: "#d8d3d3",
    },
    userSelect: "none",
  };
  // States And functions
  const [current, setCurrent] = useState(0);
  const length = images?.length;
  const nextImage = () => {
    setCurrent(current === length - 1 ? length - 1 : current + 1);
  };
  const prevImage = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };
  return (
    <>
      {images &&
        images?.map((image, idx) => (
          <Box
            sx={{
              position: "relative",
              height: "inherit",
              width: "100%",
              backgroundColor: "#fff",
              borderTop: "1px solid var(--lineColor)",
              marginTop: "5px",
            }}
            key={idx}
            style={idx === current ? { display: "block" } : { display: "none" }}
          >
            {length > 1 && (
              <>
                <IconButton
                  sx={styledButton}
                  style={
                    current !== length - 1
                      ? { display: "flex", right: "1px", zIndex: 9999 }
                      : { display: "none" }
                  }
                  onClick={nextImage}
                >
                  <ArrowForwardIosIcon
                    style={{ color: "#111", fontSize: "16px" }}
                  />
                </IconButton>
                <IconButton
                  sx={styledButton}
                  style={
                    current !== 0
                      ? { display: "flex", left: "1px", zIndex: 9999 }
                      : { display: "none" }
                  }
                  onClick={prevImage}
                >
                  <ArrowBackIosIcon
                    style={{
                      color: "#111",
                      fontSize: "16px",
                      marginLeft: "5px",
                    }}
                  />
                </IconButton>
              </>
            )}
            {idx === current && (
              <>
                {image?.secure_url?.match(/video/i) ? (
                  <video
                    style={styledImageAndVideo}
                    controls
                    src={image?.secure_url}
                  />
                ) : (
                  <img
                    style={styledImageAndVideo}
                    src={image?.secure_url}
                    alt="pictures"
                  />
                )}
              </>
            )}
          </Box>
        ))}
    </>
  );
}

export default ImageSlider;
