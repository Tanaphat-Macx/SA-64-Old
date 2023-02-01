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
import { FoodInformationInterface } from "../models/IFoodInformation";
import { format } from 'date-fns'


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

function FoodInformations() {
  const classes = useStyles();
  const [foodInformations, setFoodInformations] = useState<FoodInformationInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getFoodInformations = async () => {
    fetch(`${apiUrl}/food_informations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("food_information", res.data);
        if (res.data) {
          setFoodInformations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getFoodInformations();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการบันทึกสารอาหาร
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/food_information/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" width="3%">
                   ลำดับ
                 </TableCell>
                 <TableCell align="center" width="10%">
                   รายการอาหาร
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ชนิดของอาหาร
                 </TableCell>
                <TableCell align="center" width="7%">
                   ปริมาณแคลอรี่ที่ได้รับ (Kcal)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   คาร์โบไฮเดรต (g)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   โปรตีน (g)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ไขมัน (g)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ใยอาหาร (mg)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   โซเดียม (mg)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ฟอสฟอรัส (mg)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   แคลเซียม (mg)
                 </TableCell>
                 <TableCell align="center" width="5%">
                   นักโภชนาการ
                 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodInformations.map((item: FoodInformationInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                   <TableCell align="center">{item.Food.Name}</TableCell>
                   <TableCell align="center">{item.FoodType.Name}</TableCell>
                   <TableCell align="center">{item.Calorie}</TableCell>
                   <TableCell align="center">{item.Carbohydrate}</TableCell>
                   <TableCell align="center">{item.Protein}</TableCell>
                   <TableCell align="center">{item.Fat}</TableCell>
                   <TableCell align="center">{item.Fiber}</TableCell>
                   <TableCell align="center">{item.Sodium}</TableCell>
                   <TableCell align="center">{item.Phosphorus}</TableCell>
                   <TableCell align="center">{item.Calcium}</TableCell>                  
                   <TableCell align="center">{item.Nutritionist.Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
export default FoodInformations;

