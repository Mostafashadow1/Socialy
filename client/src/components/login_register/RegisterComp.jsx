import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import { LogicRegister, FormInput } from "components/index";
import styles from "./login_register.module.css";
import register from "assets/images/register.png";
function RegisterComp() {
  const { inputs, values, handleChange, handleRegister } = LogicRegister();
  const userAddInfo =
    values.confirmPassword.length < 6 ||
    values.username.length < 6 ||
    values.email.length < 6 ||
    values.password.length < 6 ||
    values.confirmPassword.length < 6;
  return (
    <Grid container className={styles.login_container}>
      <Grid
        item
        md={5}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <img className={styles.image} src={register} alt="img" loading="lazy" />
      </Grid>

      <Grid item xs={12} md={7} display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          padding="20px"
        >
          <Typography variant="h2" fontSize="40px" className="logo_text">
            Socialy
          </Typography>
          <form
            onSubmit={handleRegister}
            autoComplete="off"
            style={{ margin: "10px 0px" }}
          >
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                messageError={input.messageError}
                {...input}
                value={values[input.name]}
                onChange={handleChange}
              />
            ))}
            <Tooltip title="fields contain minimum 6 character" placement="top">
              <button
                className="mainButton"
                style={
                  userAddInfo
                    ? {
                        cursor: "no-drop",
                        width: "100%",
                      }
                    : {
                        cursor: "grab",
                        width: "100%",
                      }
                }
              >
                Register
              </button>
            </Tooltip>
            <Box
              display="flex"
              sx={{ padding: "20px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ margin: 1, fontSize: "18px" }}>
                have an account?
              </Typography>
              <Link to="/">
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--activeColor)",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Typography>
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterComp;
