import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import { NutritionistsInterface } from "../models/INutritionist";
import { PatientsInterface } from "../models/IPatient";
import { LimitInterface } from "../models/ILimit";
import { FoodsInterface } from "../models/IFood";
import { MealInterface } from "../models/IMeal";
import { PlanningInterface } from "../models/IPlanning";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PlanningCreate() {
  //const classes = useStyles();
  const [PnDate, setDate] = useState<Date | null>(new Date());
  const [foods, setFoods] = useState<FoodsInterface[]>([]);
  const [meal, setMeals] = useState<MealInterface[]>([]);
  const [nutritionists, setNutritions] = useState<NutritionistsInterface[]>([]);
  const [limits, setLimits] = useState<LimitInterface[]>([]);
  const [planning, setPlanning] = useState<Partial<PlanningInterface>>({}); //Partial ชิ้นส่วนเอาไว้เซทข้อมูลที่ละส่วน

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof PlanningCreate;

  //   const { value } = event.target;

  //   setPlanning({ ...planning, [id]: value });
  // };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    const name = event.target.name as keyof typeof planning;
    setPlanning({
      ...planning,
      [name]: event.target.value,
    });
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      MealID: convertType(planning.MealID),
      FoodID: convertType(planning.FoodID),
      LimitID: convertType(planning.LimitID),
      PnDate: PnDate,
      NutritionistID: Number(localStorage.getItem("nid")),
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/plannings";
    const requestOptionsPost = {
      method: "POST", //เอาข้อมูลไปเก็บไว้ในดาต้าเบส
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
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
        //   if (res.data) {
        //     setNutritions(res.data);
        //   }
        // });
        if (res.data) {
          setNutritions(res.data);
          // setPlanning({
          //   NutritionistID: res.data.ID,
          // });
        } else {
          console.log("else");
        }
      });
  };

  // const getNutritionist = async () => {
  //   fetch(`${apiUrl}/nutritionists`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res.data)
  //       if (res.data) {
  //         setNutritionists(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };
  const getFoods = async () => {
    const apiUrl = "http://localhost:8080/foods";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setFoods(res.data);
        }
      });
  };

  const getMeals = async () => {
    const apiUrl = "http://localhost:8080/meals";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMeals(res.data);
        }
      });
  };

  const getLimits = async () => {
    const apiUrl = `http://localhost:8080/limits`; //เราจะใช้เอพีไอจากตารางแพลนนิ่งไอดีโดยจะอ้างอิงชื่อผู้ป่วยจากเพเชี่ยนไอดี

    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เปลี่ยนจากเจสันเป็นจาว่าสคริปต์
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setLimits(res.data);
        }
      });
  };

  useEffect(() => {
    getFoods();
    getMeals();
    getNutritionist();
    getLimits();
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
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการวางแผนรายการอาหาร
            </Typography>
          </Box>
        </Box>

        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อผู้ป่วย</p>
              <Select
                value={planning.LimitID}
                onChange={handleChange}
                inputProps={{
                  name: "LimitID",
                }}
              >
                {limits.map(
                  (
                    item: LimitInterface //map ดึงตัวแปรจากลิมิตอาเรย์ มาทีละตัวมาไว้ในไอเทม
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Patient.Name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาหารที่เเพ้</p>
              <Select
                native
                disabled
                value={planning.LimitID} //import Snackbar from "@material-ui/core/Snackbar";
              >
                <option aria-label="None" value=""></option>
                {limits.map((item: LimitInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Patient.Allergy}
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
                disabled
                value={planning.LimitID} //import Snackbar from "@material-ui/core/Snackbar";
              >
                <option aria-label="None" value=""></option>
                {limits.map((item: LimitInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Should_Eat.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>มื้ออาหาร</p>
              <Select
                native
                value={planning.MealID}
                onChange={handleChange}
                inputProps={{
                  name: "MealID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกมื้ออาหาร
                </option>
                {meal.map((item: MealInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <br />

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รายการอาหาร</p>
              <Select
                native
                value={planning.FoodID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "FoodID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรายการอาหาร
                </option>
                {foods.map((item: FoodsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>วันที่</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={PnDate}
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
              <p>นักโภชนาการ</p>
              <Select
                disabled={true}
                value={localStorage.getItem("nid")}
                // onChange={handleChange}
                // inputProps={{
                //   name: "StaffID",
                // }}
              >
                {nutritionists.map(
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

          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <p>นักโภชนาการ</p>

              <Select
                // defaultOpen={true}
                
                // labelId="เลขบัตรประชาชน"
                // id="เลขบัตรประชาชน"
                value={planning.NutritionistID} //เปลี่ยนเลขบัตรตาม value บรรทัดนี้
                // label="Name"
                disabled={true} //เป็นจางๆไม่ให้เปลี่ยน
              >
                {nutritionists.map(
                  (
                    item: NutritionsInterface //map
                  ) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                  )
                )}
              </Select>
            </FormControl>
          </Grid> */}

          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึก</p>
              <Select
                native
                disabled
                value={planning.NutritionistID}
              >
                  <option aria-label="None" value="">
                   {nutritionists?.Name}
                  </option>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/planning"
              variant="contained"
              color="inherit"
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

export default PlanningCreate;
