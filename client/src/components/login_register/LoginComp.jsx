import { Link } from "react-router-dom";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import login from "../../assets/images/login.png";
import { LogicLogin, FormInput } from "components/index";
import styles from "./login_register.module.css";
function LoginComp() {
  const { inputs, values, handleChange, handleLogin } = LogicLogin();
  const userAddInfo = values.email.length < 6 || values.password.length < 6;
  return (
    <Grid container className={styles.login_container}>
      <Grid
        item
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <img className={styles.image} src={login} alt="img" loading="lazy" />
      </Grid>

      <Grid item xs={12} md={6} display="flex" justifyContent="center">
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
            onSubmit={handleLogin}
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
                Login
              </button>
            </Tooltip>

            <Box
              display="flex"
              sx={{ padding: "20px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ margin: 1, fontSize: "18px" }}>
                Don't have an account?
              </Typography>
              <Link to="/register">
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--activeColor)",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Typography>
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginComp;
