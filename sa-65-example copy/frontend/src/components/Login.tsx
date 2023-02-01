import Button from "@mui/material/Button";
import React from "react";
import SignInNutrition from "./SignInNutrition";
import SignInUser from "./SignInUser";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

export default function Loging() {
  const [Nutrition, setNutrition] = React.useState(false);
  const [User, setUser] = React.useState(true);

  const handleChangeNutrition = () => {
    setNutrition(true);
    setUser(false);
  };
  const handleChangeUser = () => {
    setNutrition(false);
    setUser(true);
  };
  return (
    <div className="Login">
      <nav>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={handleChangeUser}>
            User
          </Button>
          <Button variant="contained" onClick={handleChangeNutrition}>
            Nutritionist
          </Button>
        </Stack>
      </nav>
      {Nutrition && <SignInNutrition />}
      {User && <SignInUser />}
    </div>
  );
}
