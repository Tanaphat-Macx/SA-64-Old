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
import { FoodSicknessInterface } from "../models/IFoodSickness";
import { format } from 'date-fns'
import { padding } from "@mui/system";


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

function FoodSicknesses() {
  const classes = useStyles();
  const [foodSicknesses, setFoodSicknesses] = useState<FoodSicknessInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getFoodSicknesses = async () => {
    fetch(`${apiUrl}/food_sicknesses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("foodsickness", res.data);
        if (res.data) {
          setFoodSicknesses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getFoodSicknesses();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex"  sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการบันทึกอาหาร
            </Typography>
          </Box>

          <Box>
            <Button           
              component={RouterLink}
              to="/foodsicknesses/create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลอาหาร
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
                   เมนูอาหาร
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ชนิดอาหาร
                 </TableCell>
                <TableCell align="center" width="7%">
                   อาหารบำบัด
                 </TableCell>
                 <TableCell align="center" width="5%">
                   รูปแบบการทาน
                 </TableCell>
                 <TableCell align="center" width="5%">
                   โรค
                 </TableCell>
                 <TableCell align="center" width="5%">
                   ผู้บันทึกข้อมูล
                 </TableCell>
                 <TableCell align="center" width="5%">
                   วันที่บันทึก
                 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodSicknesses.map((foodSicknesses: FoodSicknessInterface) => (
                <TableRow key={foodSicknesses.ID}>
                  <TableCell align="center">{foodSicknesses.ID}</TableCell>
                   <TableCell align="center">{foodSicknesses.Food.Name}</TableCell>
                   <TableCell align="center">{foodSicknesses.FoodType.Name}</TableCell>
                   <TableCell align="center">{foodSicknesses.TherapeuticDiet.Name}</TableCell>
                   <TableCell align="center">{foodSicknesses.Eat.Name}</TableCell>  
                   <TableCell align="center">{foodSicknesses.Sickness.Name}</TableCell>         
                   <TableCell align="center">{foodSicknesses.Nutritionist.Name}</TableCell>
                   <TableCell align="center">{format((new Date(foodSicknesses.RecordTime)), 'dd MMMM yyyy ')}   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
export default  FoodSicknesses;

 //status 404: เชื่อม url หรือ apiurl ไม่ได้
 //status 400: Bad request การร้องขอผิดพลาด เกิดขึ้นได้หลายกรณี
 //status 204: ได้รับการตอบรับแล้วแต่ยังไม่เสร็จ
 //status 200: status ถูกต้อง ได้รับ req และทำเสร็จแล้ว


