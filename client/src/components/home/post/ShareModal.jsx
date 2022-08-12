import React from "react";
import { Box, Typography } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { CoverModal } from "components/index";
// react share
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerIcon,
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share";
function ShareModal({ url, setIsShare }) {
  return (
    <Box onClick={() => setIsShare(false)}>
      <CoverModal>
        <Box maxwidth="500px" minWidth="250px" padding="20px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <Typography variant="h5" textAlign="center">
              Share To
            </Typography>
            <ShareOutlinedIcon />
          </Box>
          <Box border="1px solid var(--lineColor)" />
          <Box
            display="flex"
            flexWrap="wrap"
            marginTop="40px"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <EmailShareButton url={url}>
              <EmailIcon round={true} size={40} />
            </EmailShareButton>
            <FacebookShareButton url={url}>
              <FacebookIcon round={true} size={40} />
            </FacebookShareButton>
            <FacebookMessengerShareButton url={url}>
              <FacebookMessengerIcon round={true} size={40} />
            </FacebookMessengerShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon round={true} size={40} />
            </WhatsappShareButton>

            <LinkedinShareButton url={url}>
              <LinkedinIcon round={true} size={40} />
            </LinkedinShareButton>

            <TwitterShareButton url={url}>
              <TwitterIcon round={true} size={40} />
            </TwitterShareButton>
            <RedditShareButton url={url}>
              <RedditIcon round={true} size={40} />
            </RedditShareButton>
          </Box>
        </Box>
      </CoverModal>
    </Box>
  );
}

export default ShareModal;
