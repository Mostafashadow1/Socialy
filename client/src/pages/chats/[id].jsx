import React, { useEffect } from "react";
import { ScrollHook } from "../../hooks/ScrollHook";
import { Container, Grid } from "@mui/material";
import { Chat, ChatsMenue } from "components/index";
function PageChat() {
  const { hiddenScroll } = ScrollHook();
  useEffect(() => {
    hiddenScroll();
  }, [hiddenScroll]);
  return (
    <Container maxWidth="lg">
      <Grid
        container
        sx={{
          border: "1px solid var(--lineColor)",
          borderRadius: "6px",
          height: "calc(100vh - 100px)",
          marginTop: "20px!important",
        }}
      >
        <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={0} md={4}>
          <ChatsMenue />
        </Grid>
        <Grid item xs={12} md={8} position="relative" height="100%">
          <Chat />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageChat;
