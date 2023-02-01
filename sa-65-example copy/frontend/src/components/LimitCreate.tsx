import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { NutritionistsInterface } from "../models/INutritionist";
import { Should_EatsInterface } from "../models/IShould_Eat";
import { PatientsInterface } from "../models/IPatient";
import { EdiblesInterface } from "../models/IEdible";
import { LimitInterface } from "../models/ILimit";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function LimitCreate() {
  const classes = useStyles();
  const [nutritionists, setNutritionists] = useState<
    Partial<NutritionistsInterface>
  >({});
  const [Patients, setPatients] = useState<PatientsInterface[]>([]);
  const [Patient, setPatient] = useState<Partial<PatientsInterface>>({});
  const [Edibles, setEdibles] = useState<EdiblesInterface[]>([]);
  const [PatientID, setPatientID] = useState(Number);
  const [Should_Eats, setShould_Eats] = useState<Should_EatsInterface[]>([]);
  const [Limit, setLimit] = useState<Partial<LimitInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Limit;
    setLimit({
      ...Limit,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof LimitCreate;
    const { value } = event.target;
    setLimit({ ...Limit, [id]: value });
  };

  const handleChangeMED = (event: React.ChangeEvent<{ value: any }>) => {
    //ตัวแปรชื่อ event
    console.log(event.target.value);
    setPatientID(event.target.value);
    setPatients(event.target.value); //เข้าถึง value ไปขอ
  };

  //นักโภชนาการ
  const getNutritionists = async () => {
    console.log("A");

    const uid = Number(localStorage.getItem("nid"));
    fetch(`${apiUrl}/nutritionist/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        if (res.data) {
          setNutritionists(res.data);
          setLimit({
            NutritionistID: res.data.ID,
          });
          {
          }
          console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //ผู้ป่วย
  const getPatient = async () => {
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //อาหารที่ทานได่
  const getEdible = async () => {
    fetch(`${apiUrl}/edibles`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEdibles(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //อาหารที่ควรทาน
  const getShould_Eat = async () => {
    fetch(`${apiUrl}/should_Eats`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setShould_Eats(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    //ทำงานทุกครั้งที่เรารีเฟชหน้าจอ
    //ไม่ให้รันแบบอินฟินิตี้ลูป
    getPatient();
    getEdible();
    getShould_Eat();
    getNutritionists();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      PatientID: convertType(Limit.PatientID),
      EdibleID: convertType(Limit.EdibleID),
      Should_EatID: convertType(Limit.Should_EatID),
      Limit_details: Limit.Limit_details,
      NutritionistID: convertType(nutritionists?.ID),
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/limits";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อจำกัดการบริโภค
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ-สกุล(ผู้ป่วย)</p>
              <Select
                native
                value={Limit.PatientID}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อผู้ป่วย
                </option>
                {Patients.map((item: PatientsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาหารหรือยาที่เเพ้</p>
              <Select
                native
                disabled
                value={Limit.PatientID} //import Snackbar from "@material-ui/core/Snackbar";
              >
                <option aria-label="None" value=""></option>
                {Patients.map((item: PatientsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Allergy}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>โรคประจำตัว</p>
              <Select
                native
                disabled
                value={Limit.PatientID} //import Snackbar from "@material-ui/core/Snackbar";
              >
                <option aria-label="None" value=""></option>
                {Patients.map((item: PatientsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Sickness}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาหารที่ทานได้</p>
              <Select
                native
                value={Limit.EdibleID}
                onChange={handleChange}
                inputProps={{
                  name: "EdibleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาหารที่ผู้ป่วยทานได้
                </option>
                {Edibles.map((item: EdiblesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาหารที่ควรทาน</p>
              <Select
                native
                value={Limit.Should_EatID}
                onChange={handleChange}
                inputProps={{
                  name: "Should_EatID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาหารที่ผู้ป่วยควรทาน
                </option>
                {Should_Eats.map((item: Should_EatsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>รายละเอียดเพิ่มเติม(เน้น/งดอาหาร)</p>
              <TextField
                id="Limit_details"
                variant="outlined"
                type="string"
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={Limit.Limit_details || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>นักโภชนาการผู้บันทึก</p>
              <Select native disabled value={Limit.NutritionistID}>
                <option aria-label="None" value="">
                  {nutritionists?.Name}
                </option>
                {/* <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึกข้อมูล</p>
              <Select native disabled value={patient.UserID}>
                <option aria-label="None" value="">
                  {Users?.Name}
                </option>
              </Select>
            </FormControl> */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/Limits" variant="contained">
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default LimitCreate;
