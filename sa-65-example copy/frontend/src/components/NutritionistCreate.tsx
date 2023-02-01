import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { NutritionistsInterface } from "../models/INutritionist";
import { UsersInterface } from "../models/IUser";
import { GendersInterface } from "../models/IGender";
import { JobDutiesesInterface } from "../models/IJobDutieses";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

function NutritionistCreate() {
  const [date, setDate] = useState<Date | null>();
  const classes = useStyles();
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [jobdutieses, setJobdutieses] = useState<JobDutiesesInterface[]>([]);
  const [nutritionist, setNutritionist] = useState<
    Partial<NutritionistsInterface>
  >({});
  const [users, setUsers] = useState<Partial<UsersInterface>>({});
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
    const name = event.target.name as keyof typeof nutritionist;
    setNutritionist({
      ...nutritionist,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof NutritionistCreate;
    const { value } = event.target;
    setNutritionist({ ...nutritionist, [id]: value });
  };

  // const handleDateChange = (date: Date | null) => {
  //   console.log(date);
  //   setSelectedDate(date);
  // };

  const getGenders = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getJobDutieses = async () => {
    fetch(`${apiUrl}/jobdutieses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("job:", res.data);
          setJobdutieses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getUsers = async () => {
    console.log("A");
    const uid = Number(localStorage.getItem("uid"));

    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setUsers(res.data);
          setNutritionist({
            UserID: res.data.ID,
          });
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getGenders();
    getJobDutieses();
    getUsers();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      Name: nutritionist.Name,
      Tel: nutritionist.Tel,
      Email: nutritionist.Email,
      GenderID: convertType(nutritionist.GenderID),
      JobDutiesID: convertType(nutritionist.JobDutiesID),
      UserID: convertType(users?.ID),
      DOB: new Date(),
      Password: nutritionist.Password,
    };
    console.log(data);

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/nutritionists`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้");
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้");
          console.log(res.error);
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
              บันทึกข้อมูลนักโภชนาการ
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"
                value={nutritionist.Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อีเมล</p>
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลอีเมล"
                value={nutritionist.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>รหัสผ่าน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password"
                variant="outlined"
                type="password"
                size="medium"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={nutritionist.Password || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Tel"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={nutritionist.Tel || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={nutritionist.GenderID}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {genders.map((item: GendersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>วันเดือนปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หน้าที่</p>
              <Select
                native
                value={nutritionist.JobDutiesID}
                onChange={handleChange}
                inputProps={{
                  name: "JobDutiesID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหน้าที่รับผิดชอบ
                </option>
                {jobdutieses.map((item: JobDutiesesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึก</p>
              <Select native disabled value={nutritionist.UserID}>
                <option aria-label="None" value="">
                  {users?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/nutritionists"
              variant="contained"
            >
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

export default NutritionistCreate;
