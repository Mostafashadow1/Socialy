export const styledParentHeader = {
  borderBottom: "1px solid var(--lineColor)",
  position: "sticky",
  top: 0,
  zIndex: 99999,
  transition: "all 200ms ease-in-out",
  padding: "5px 0px",
  backgroundColor: "var(--bgColor)",
};
export const styledSearch = {
  position: "relative",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: 5,
  backgroundColor: "var(--secondColor)",
};

export const styledIconWrapper = {
  padding: "5px",
  height: "100%",
  pointerEvents: "none",
  display: "flex",
};

export const styledInput = {
  borderWidth: 0,
  outlineWidth: 0,
  padding: "10px",
  width: "100%",
  fontSize: "16px",
  backgroundColor: "inherit",
  color: "#fff",
};

export const styledAppBar = {
  display: "flex",
  flex: "1",
  alignItems: "center",
};

export const styledSearchData = {
  position: "absolute",
  top: "30px",
  maxHeight: "320px",
  minWidth: "fit-content",
  width: "100%",
  borderRadius: "6px",
  marginTop: "10px",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: "var(--secondColor)",
  zIndex: 999999999,
};
