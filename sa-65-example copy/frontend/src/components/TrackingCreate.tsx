import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TrackingEvaluationInterface } from "../models/ITrackingEvaluation";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import { PlanningInterface } from "../models/IPlanning";
import { PatientsInterface } from "../models/IPatient";
import { NutritionStatusInterface } from "../models/INutritionalStatus";
import { NutritionistsInterface } from "../models/INutritionist";
import { ProblemEatingInterface } from "../models/IProblemEating";
import { WeightProblemInterface } from "../models/Iweightproblem";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TrackingCreate() {
  const [date, setDate] = useState<Date | null>();
  const [tracking, setTracking] = useState<
    Partial<TrackingEvaluationInterface>
  >({}); //Partial ชิ้นส่วนเอาไว้เซทข้อมูลที่ละส่วน
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [plannings, setPlannings] = useState<PlanningInterface[]>([]);
  const [problemeating, setProblemeating] = useState<ProblemEatingInterface[]>(
    []
  );
  const [weightproblem, setWeightProblem] = useState<WeightProblemInterface[]>(
    []
  );

  const [nutritionalStatus, setNutritionalStatus] = useState<
    NutritionStatusInterface[]
  >([]);
  const [nutritionist, setNutritionist] = useState<NutritionistsInterface[]>(
    []
  );

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }> //ชื่อคอมลัมน์คือ id และค่าที่จะเอามาใส่ไว้ในคอมลัมน์นั้นคือ value
  ) => {
    const id = event.target.id as keyof typeof tracking; //
    // console.log(event.target.id);
    // console.log(event.target.value);

    const { value } = event.target;

    setTracking({ ...tracking, [id]: value });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }> //ชื่อคอมลัมน์คือ id และค่าที่จะเอามาใส่ไว้ในคอมลัมน์นั้นคือ value
  ) => {
    const name = event.target.name as keyof typeof tracking; //
    console.log(event.target.name);
    console.log(event.target.value);

    const { value } = event.target;

    setTracking({ ...tracking, [name]: value });
  };

  // const handleChangePlanning = (event: React.ChangeEvent<{ value: any }>) => {
  //   //ตัวแปรชื่อ event
  //   console.log(event.target.value);
  //   setPlanningID(event.target.value);
  // };

  function submit() {
    let data = {
      //เก็บข้อมูลที่จะเอาไปเก็บในดาต้าเบส
      Note: tracking.Note ?? "",
      Date: new Date(),
      PlanningID: tracking.PlanningID,
      ProblemEatingID: tracking.ProblemEatingID,
      WeightProblemID: tracking.WeightProblemID,
      NutritionalStatusID: tracking.NutritionalStatusID,
      NutritionistID: Number(localStorage.getItem("nid")),
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/tracking";
    const requestOptions = {
      method: "POST", //เอาข้อมูลไปเก็บไว้ในดาต้าเบส
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, //การยืนยันตัวตน
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          getPlanning();
        } else {
          setError(true);
        }
      });
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, //การยืนยันตัวตน
      "Content-Type": "application/json",
    },
  };
  const getNutritionist = async () => {
    const apiUrl = "http://localhost:8080/nutritionists";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setNutritionist(res.data);
        }
      });
  };

  const getPlanning = async () => {
    const apiUrl = `http://localhost:8080/planningsNoTrackingCheck`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เปลี่ยนจากเจสันเป็นจาว่าสคริปต์
      .then((res) => {
        console.log("planing", res.data);
        if (res.data) {
          setPlannings(res.data);
        }
      });
  };

  const getProblemEating = async () => {
    const apiUrl = "http://localhost:8080/problemeating";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setProblemeating(res.data);
        }
      });
  };

  const getWeightProblem = async () => {
    const apiUrl = "http://localhost:8080/weightproblem";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setWeightProblem(res.data);
        }
      });
  };

  const getNutritionalStatus = async () => {
    const apiUrl = "http://localhost:8080/nutritionStatus";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setNutritionalStatus(res.data);
        }
      });
  };

  useEffect(() => {
    //ทำงานทุกครั้งที่เรารีเฟชหน้าจอ
    //ไม่ให้รันแบบอินฟินิตี้ลูป
    getPlanning();
    // getPatient();
    getNutritionalStatus();
    getProblemEating();
    getWeightProblem();
    getNutritionist();
  }, []);

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
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
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการติดตามและประเมินภาวะโภชนาการ
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Grid container spacing={3} sx={{ padding: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <Typography variant="h6">
                จำนวนรายการที่เหลือ {plannings.length} รายการ
              </Typography>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p id="เลขบัตรประชาชน">เลขบัตรประชาชน</p>

              <Select
                // defaultOpen={true}
                disabled={true} //เป็นจางๆไม่ให้เปลี่ยน
                labelId="เลขบัตรประชาชน"
                id="เลขบัตรประชาชน"
                value={planningID} //เปลี่ยนเลขบัตรตาม value บรรทัดนี้
                // label="Name"
              >
                {patients.map(
                  (
                    item: PatientsInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Idcard}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <p>รายการมื้ออาหารที่บริโภค</p>

              <Select
                // id="PlanningID"
                value={tracking.PlanningID}
                onChange={handleChange}
                inputProps={{
                  name: "PlanningID", //เอาไว้เข้าถึงข้อมูลแพลนนิ่งไอดี
                }}
              >
                {plannings.map(
                  (
                    item: PlanningInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      ผู้ป่วย: {item.Limit.Patient.Name} มื้ออาหาร:{" "}
                      {item.Meal.Name} เมนูอาหาร: {item.Food.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>ปัญหาการรับประทานอาหาร</p>

              <Select
                // id="PlanningID"
                value={tracking.ProblemEatingID}
                onChange={handleChange}
                inputProps={{
                  name: "ProblemEatingID", //เอาไว้เข้าถึงข้อมูลProblemID
                }}
              >
                {problemeating.map(
                  (
                    item: ProblemEatingInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>ปัญหาด้านน้ำหนัก</p>

              <Select
                // id="PlanningID"
                value={tracking.WeightProblemID}
                onChange={handleChange}
                inputProps={{
                  name: "WeightProblemID", //เอาไว้เข้าถึงข้อมูลProblemID
                }}
              >
                {weightproblem.map(
                  (
                    item: WeightProblemInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <p>หมายเหตุเพิ่มเติม</p>
              <TextField
                id="Note"
                variant="standard"
                type="string"
                size="medium"
                value={tracking.Note || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <p>ปัญหาการรับประทานอาหาร</p>
              <TextField
                // label="อาการของผู้ป่วย"
                id="Symptom"
                variant="standard"
                type="string"
                size="medium"
                value={tracking.Symptom || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <p>ภาวะโภชนาการของผู้ป่วย</p>

              <Select
                value={tracking.NutritionalStatusID}
                onChange={handleChange}
                inputProps={{
                  name: "NutritionalStatusID", //เอาไว้เข้าถึงข้อมูลนิวทริชั่นไอดี
                }}
              >
                {nutritionalStatus.map(
                  (
                    item: NutritionStatusInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>ผู้บันทึกข้อมูล</p>

              <Select
                // defaultOpen={true}
                disabled={true} //เป็นจางๆไม่ให้เปลี่ยน
                // labelId="เลขบัตรประชาชน"
                // id="เลขบัตรประชาชน"
                value={localStorage.getItem("nid")}
                // label="Name"
              >
                {nutritionist.map(
                  (
                    item: NutritionistsInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>วันที่และเวลาบันทึกข้อมูล</p>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disabled
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/tracking" variant="contained">
              กลับ
            </Button>

            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="success"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TrackingCreate;
