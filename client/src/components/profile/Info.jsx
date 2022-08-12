import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Grid, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AvatarUser } from "utils/helper";
import {
  EditProfile,
  FollowButtonToggle,
  Followers,
  Following,
} from "components/index";

function Info({ auth, profileUser }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [userData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Check profile user mine or other
  useEffect(() => {
    if (auth.user._id === id) {
      setUserData([auth.user]);
    } else {
      const userProfile = profileUser?.users?.filter((user) => user._id === id);
      setUserData(userProfile);
    }
  }, [auth, dispatch, id, profileUser.users]);

  // show Followers Button
  const handleShowFollowers = () => {
    setShowFollowers(true);
    setShowFollowing(false);
  };

  // show Following Button
  const handleShowFollowing = () => {
    setShowFollowing(true);
    setShowFollowers(false);
  };

  return (
    <>
      {userData &&
        userData.map((user) => (
          <React.Fragment key={user?._id}>
            <Box>
              <Grid container display="flex" justifyContent="center">
                <Grid item sm={4}>
                  <Grid
                    container
                    sx={{
                      marginTop: { xs: "20px", sm: "50px" },
                    }}
                  >
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          height: { xs: "70%", sm: "100%" },
                          marginTop: { xs: "20px", md: "0" },
                          width: "100%",
                          justifyContent: { xs: "center" },
                        }}
                      >
                        {AvatarUser(user.avatar, user.username, {
                          fontWeight: "bold",
                          fontSize: "40px",
                          width: "150px",
                          height: "150px",
                          zIndex: 1,
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  sx={{ marginTop: { xs: "-10px", sm: "20px" } }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={10} md={7}>
                      <Box
                        sx={{
                          height: "100%",
                          paddingTop: "20px",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "20px" }} variant="h5">
                            {user.username}{" "}
                          </Typography>
                        </Box>

                        <Box>
                          {auth.user._id === id ? (
                            <Button
                              sx={{ color: "var(--activeColor)" }}
                              onClick={() => setIsEdit(true)}
                              variant="outlined"
                            >
                              Edit Profile
                            </Button>
                          ) : (
                            <FollowButtonToggle user={user} />
                          )}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={5}>
                        <Grid item>
                          <Box>
                            <Link
                              to=""
                              style={{ color: "var(--activeColor)" }}
                              onClick={handleShowFollowers}
                            >
                              <Typography>
                                {user.followers.length} followers
                              </Typography>
                            </Link>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box>
                            <Link
                              to=""
                              style={{ color: "var(--activeColor)" }}
                              onClick={handleShowFollowing}
                            >
                              <Typography>
                                {user.following.length} following
                              </Typography>
                            </Link>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "200px",
                                fontWeight: "500",
                                fontSize: "18px",
                              }}
                            >
                              {user?.fullname}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "200px",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              {user.gender && `gender: ${user?.gender}`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "200px",
                                fontWeight: "500",
                                fontSize: "16px",
                              }}
                            >
                              {user?.number}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "fit-content",
                                maxWidth: "300px",
                                fontSize: "16px",
                              }}
                            >
                              {user?.bio}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={11} sx={{ marginTop: "-10px" }}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "fit-content",
                                maxWidth: "300px",
                                fontSize: "16px",
                              }}
                            >
                              {user.address}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "200px",
                                fontSize: "18px",
                              }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <a
                              href={user.website}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  width: "200px",
                                  fontSize: "18px",
                                  color: "#2179cf",
                                }}
                              >
                                {user.website}
                              </Typography>
                            </a>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {isEdit && <EditProfile setIsEdit={setIsEdit} />}
            {showFollowing && (
              <Following
                following={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
            {showFollowers && (
              <Followers
                followers={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
          </React.Fragment>
        ))}
    </>
  );
}

export default Info;
