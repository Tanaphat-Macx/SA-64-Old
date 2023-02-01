import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LimitInterface } from "../models/ILimit";
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

function Limits() {
  const classes = useStyles();
  const [limits, setLimits] = useState<LimitInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getLimits = async () => {
    fetch(`${apiUrl}/limits`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("limit", res.data);
        if (res.data) {
          setLimits(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getLimits();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการบันทึกข้อจำกัดการบริโภคของผู้ป่วย
            </Typography>
          </Box>
  
          <Box>
            <Button
              style={{ float: "right" }}
              component={RouterLink}
              to="/Limit/create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อจำกัดการบริโภค

            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" width="2%">
                   ลำดับ
                 </TableCell>
                 <TableCell align="center" width="13%">
                   ชื่อ-สกุล(ผู้ป่วย)
                 </TableCell>
                 <TableCell align="center" width="10%">
                   อาหารหรือยาที่เเพ้
                 </TableCell>
                 <TableCell align="center" width="13%">
                   โรคประจำตัว
                 </TableCell>
                <TableCell align="center" width="13%">
                   อาหารที่ทานได้
                 </TableCell>
                 <TableCell align="center" width="13%">
                   อาหารที่ควรทาน
                 </TableCell>
                 <TableCell align="center" width="17%">
                   รายละเอียดเพิ่มเติม(เน้น/งดอาหาร)
                 </TableCell>
                 <TableCell align="center" width="8">
                   นักโภชนาการผู้บันทึก
                 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {limits.map((limit: LimitInterface) => (
                <TableRow key={limit.ID}>
                  <TableCell align="center">{limit.ID}</TableCell>
                   <TableCell align="center">{limit.Patient.Name}</TableCell>
                   <TableCell align="center">{limit.Patient.Allergy}</TableCell>
                   <TableCell align="center">{limit.Patient.Sickness}</TableCell>
                   <TableCell align="center">{limit.Edible.Name}</TableCell>
                   <TableCell align="center">{limit.Should_Eat.Name}</TableCell>
                   <TableCell align="center">{limit.Limit_details}</TableCell>                  
                   <TableCell align="center">{limit.Nutritionist.Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
export default Limits;


