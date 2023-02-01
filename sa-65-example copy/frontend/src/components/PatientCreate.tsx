import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material//Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { UsersInterface } from "../models/IUser";
import { GendersInterface } from "../models/IGender";
import { NametitleInterface } from "../models/INametitle";
import { PatientsInterface } from "../models/IPatient";
import React from "react";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { NativeSelect } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function PatientCreate() {
  const classes = useStyles();
  const [Users, setUsers] = useState<Partial<UsersInterface>>({});

  const [Genders, setGenders] = useState<GendersInterface[]>([]);
  const [Nametitiles, setNametitles] = useState<NametitleInterface[]>([]);

  const [patient, setPatient] = React.useState<Partial<PatientsInterface>>({});

  const [bday, setBday] = React.useState<Date | null>(null);
  const [datetime, setDatetime] = React.useState<Dayjs | null>(null);

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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }> //ชื่อคอมลัมน์คือ id และค่าที่จะเอามาใส่ไว้ในคอมลัมน์นั้นคือ value
  ) => {
    const name = event.target.name as keyof typeof patient; //
    console.log(event.target.name);
    console.log(event.target.value);

    const { value } = event.target;

    setPatient({ ...patient, [name]: value });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PatientCreate;
    const { value } = event.target;
    setPatient({ ...patient, [id]: value });
  };

  //user
  const getUsers = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("User", res.data);

        if (res.data) {
          setUsers(res.data);
          setPatient({
            UserID: res.data.ID,
          });
          {
          }
        } else {
          console.log("else");
        }
      });
  };

  //เพศ
  const getGenders = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //nametitle
  const getNametitles = async () => {
    fetch(`${apiUrl}/Nametitle`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setNametitles(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    //ทำงานทุกครั้งที่เรารีเฟชหน้าจอ
    //ไม่ให้รันแบบอินฟินิตี้ลูป
    getNametitles();
    getGenders();
    getUsers();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      Idcard: patient.Idcard,

      NametitleID: convertType(patient.NametitleID),

      Name: patient.Name,
      Age: convertType(patient.Age),
      Bday: bday,

      GenderID: convertType(patient.GenderID),

      Allergy: patient.Allergy,
      Sickness: patient.Sickness,
      Datetime: datetime,

      UserID: convertType(Users?.ID),
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/patients";
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
    <Container maxWidth="md">
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
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              สร้างข้อมูลผู้ป่วย
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <p>เลขบัตรประจำตัวประชาชน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Idcard"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเลขบัตรประจำตัว"
                value={patient.Idcard || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <p>คำนำหน้าชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <NativeSelect
                id="Nametitle"
                value={patient.NametitleID}
                onChange={handleChange}
                inputProps={{
                  name: "NametitleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคำนำหน้าชื่อ
                </option>
                {Nametitiles.map((item: NametitleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>ชื่อ - สกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"
                value={patient.Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>อายุ</p>
              <TextField
                id="Age"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 200 } }}
                type="number"
                size="medium"
                value={patient.Age || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันเดือนปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={bday}
                  onChange={(newValue) => {
                    setBday(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <NativeSelect
                id="Gender"
                value={patient.GenderID}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {Genders.map((item: GendersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>ประวัติการแพ้อาหาร/ยา</p>
              <TextField
                id="Allergy"
                variant="outlined"
                type="password"
                size="medium"
                multiline
                rows={2}
                placeholder="กรุณากรอกประวัติการแพ้อาหาร/ยา"
                value={patient.Allergy || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>โรคประจำตัว</p>
              <TextField
                id="Sickness"
                variant="outlined"
                type="password"
                size="medium"
                multiline
                rows={2}
                placeholder="กรุณากรอกโรคประจำตัว"
                value={patient.Sickness || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่เข้ารับการรักษา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={datetime}
                  onChange={(newValue) => {
                    setDatetime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึกข้อมูล</p>
              <Select native disabled value={patient.UserID}>
                <option aria-label="None" value="">
                  {Users?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/patients"
              variant="contained"
              color="inherit"
            >
              ย้อนกลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientCreate;
