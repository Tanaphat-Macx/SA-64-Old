import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NutritionistsInterface } from "../models/INutritionist";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Nutritionists() {
  const classes = useStyles();
  const [nutritionists, setNutritionists] = useState<NutritionistsInterface[]>(
    []
  );

  const getNutritionists = async () => {
    const apiUrl = "http://localhost:8080/nutritionists";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setNutritionists(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getNutritionists();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ???????????????????????????????????????????????????
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/nutritionist/create"
              variant="contained"
              color="primary"
            >
              ?????????????????????????????????
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ???????????????
                </TableCell>
                <TableCell align="center" width="25%">
                  ????????????
                </TableCell>
                <TableCell align="center" width="10%">
                  ??????????????????????????????????????????
                </TableCell>
                <TableCell align="center" width="10%">
                  ???????????????????????????????????????
                </TableCell>
                <TableCell align="center" width="10%">
                  ???????????????
                </TableCell>
                <TableCell align="center" width="10%">
                  ?????????
                </TableCell>
                <TableCell align="center" width="15%">
                  ????????????????????????????????????????????????
                </TableCell>
                <TableCell align="center" width="15%">
                  ???????????????????????????
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutritionists.map((nutritionist: NutritionistsInterface) => (
                <TableRow key={nutritionist.ID}>
                  <TableCell align="center">{nutritionist.ID}</TableCell>
                  <TableCell align="center">{nutritionist.Name}</TableCell>
                  <TableCell align="center">
                    {format(new Date(nutritionist.DOB), "dd MMMM yyyy")}
                  </TableCell>
                  <TableCell align="center">{nutritionist.Tel}</TableCell>
                  <TableCell align="center">{nutritionist.Email}</TableCell>
                  <TableCell align="center">
                    {nutritionist.Gender.Type}
                  </TableCell>
                  <TableCell align="center">
                    {nutritionist.JobDuties.Name}
                  </TableCell>
                  <TableCell align="center">{nutritionist.User.Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Nutritionists;
