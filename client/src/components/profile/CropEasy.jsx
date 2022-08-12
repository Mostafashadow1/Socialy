import React, { useState } from "react";
import Cropper from "react-easy-crop";

import {
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CropIcon from "@mui/icons-material/Crop";
import Cancel from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import getCroppedImg from "../../utils/cropImage";

function CropEasy({ avatar, setOpenCrop, setAvatar, setFile }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFocusInCrop = (e) => {
    e.stopPropagation();
  };
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCancel = () => {
    setFile("");
    setAvatar("");
    setOpenCrop(false);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        avatar,
        croppedAreaPixels,
        rotation
      );
      setFile(file);
      setAvatar(url);
      setOpenCrop(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const zoomPercent = (value) => `${Math.round(value * 100)}%`;
  return (
    <Box
      onClick={handleFocusInCrop}
      sx={{
        backgroundColor: "var(--secondColor)",
        marginTop: "-40px",
        borderRadius: "2px",
        zIndex: 99999,
        padding: "2px",
        minWidth: "250px",
        position: "absolute",
        transform: "translate(-50% , -50%)",
        left: "50%",
        top: "50%",
        border: "1px solid var(lineColor)",
        overflowY: "auto",
        overflowX: "hidden",
        width: { xs: "95vw", sm: "94vw", md: "400px", lg: "600px" },
        height: { xs: "500px", md: "fit-content" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle>Change Profile Photo</DialogTitle>
        <IconButton onClick={handleCancel} sx={{ width: "fit-content" }}>
          <CloseIcon style={{ fontSize: "27px" }} />
        </IconButton>
      </Box>
      <DialogContent
        dividers
        sx={{
          backgroundColor: "#333",
          position: "relative",
          height: "400px",
          minWidth: { xs: "fit-content", sm: "500px" },
        }}
      >
        <Cropper
          image={avatar}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={cropComplete}
          onZoomChange={setZoom}
        />
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: "column",
          mx: 3,
          my: 2,
        }}
      >
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)} </Typography>
            <Slider
              valueLabelDisplay="auto"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation} </Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </Box>
  );
}

export default CropEasy;
