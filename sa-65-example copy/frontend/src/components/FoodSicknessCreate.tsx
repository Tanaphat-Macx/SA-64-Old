import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import TextField from "@mui/material/TextField";
import { EatsInterface } from "../models/IEat";
import { FoodsInterface } from "../models/IFood";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { NutritionistsInterface } from "../models/INutritionist";
import { FoodTypesInterface } from "../models/IFoodType";
import { SicknessesInterface } from "../models/ISickness";
import { FoodSicknessInterface } from "../models/IFoodSickness";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TherapeuticDietsInterface } from "../models/ITherapeuticDiet";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";

//Component คือสามารถเก็บ UI ต่างๆไว้และสามารถใช้งานได้อย่างอิสระ

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

function FoodSicknessCreate() {
   //useState  คือ เปลี่ยนค่าตัวแปร หรือ obj โดยคิดแบบ state 
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [eats, setEats] = useState<EatsInterface[]>([]);
  const [foods, setFoods] = useState<FoodsInterface[]>([]);
  const [foodtypes, setFoodTypes] = useState<FoodTypesInterface[]>([]);
  const [sicknesses, setSicknesses] = useState<SicknessesInterface[]>([]);
  const [foodSickness, setFoodSickness] = useState<
    Partial<FoodSicknessInterface> //Partial ชิ้นส่วนเอาไว้เซทข้อมูลที่ละส่วน //ประกาศให้ตัวแปรใน obj มีอิสระ ต่อกัน // ดึงข้อมูลแค่บางส่วนออกมา
  >({});
  const [nutritionists, setNutritionists] = useState<
    Partial<NutritionistsInterface>
  >({});
  const [therapeuticdiets, setTherapeuticDiets] = useState<
    TherapeuticDietsInterface[]
  >([]);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET", // get รับส่งข้อมูลที่ไม่เคร่งเรื่องความปลอภัย รับ-ส่งผ่าน url มีข้อมูลไม่ใหญ่
    // ขอ Authorization ผ่าน middlewere  
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, //token = รหัสชุดนึง
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
    const name = event.target.name as keyof typeof foodSickness;
    setFoodSickness({
      ...foodSickness,
      [name]: event.target.value,
    });
  };

  // ฟังก์ชัน get คือรับค่าหรือเรียกดูข้อมูล
  // async สามารถrun code พร้อมกันได้โดย ไม่ต้องรอบรรทัดก่อนหน้าเสร็จก่อน
  const getEats = async () => {
    // fetch เชืื่อมต่อ frontend กับ backend ผ่าน api
    fetch(`${apiUrl}/eats`, requestOptions)
     // มี then เผื่อรับ respond มา
      .then((response) => response.json())  //เปลี่ยนจากเจสันเป็นจาว่าสคริปต์
      .then((res) => {
        if (res.data) {
          setEats(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTherapeuticDiet = async () => {
    fetch(`${apiUrl}/therapeuticdiets`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTherapeuticDiets(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSickness = async () => {
    fetch(`${apiUrl}/sicknesses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSicknesses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getNutritionists = async () => {
    const uid = Number(localStorage.getItem("nid"));
    fetch(`${apiUrl}/nutritionist/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setNutritionists(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getFoods = async () => {
    fetch(`${apiUrl}/foods`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFoods(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getFoodType = async () => {
    fetch(`${apiUrl}/foodtypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setFoodTypes(res.data);
        } else {
          console.log("else");
        }
      });
  };


  //ฟังก์ชันที่เอาไว้ใช้เรียกงานเมื่อ component มีการเปลี่้ยนแปลง สามารถส่เงื่อนไขการเรียกใช้ได้ที่[]
  useEffect(() => {
    //ทำงานทุกครั้งที่เรารีเฟชหน้าจอ
    //ไม่ให้รันแบบอินฟินิตี้ลูป
    getEats();
    getFoods();
    getSickness();
    getFoodType();
    getNutritionists();
    getTherapeuticDiet();
  }, []);

  //แปลงค่าข้อมูลไปเป็นตัวเลข
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() { 
    let data = {
      // ข้อมูลที่จะเก็บเอาไว้ในเดค้าเบส
      FoodID: convertType(foodSickness.FoodID),
      FoodTypeID: convertType(foodSickness.FoodTypeID),
      TherapeuticDietID: convertType(foodSickness.TherapeuticDietID),
      EatID: convertType(foodSickness.EatID),
      SicknessID: convertType(foodSickness.SicknessID),
      RecordTime: date,
      NutritionistID: Number(localStorage.getItem("nid")),
    };
    console.log(data);

    //api = "application Program Interface" ทำหน้าที่ช่วยในการสื่อสาร(เชื่อมต่อระหว่างระบบ) อัพเดตข้อมูล
    const apiUrl = "http://localhost:8080/food_sicknesses";
    const requestOptions = {
      method: "POST", //เอาข้อมูลไปเก็บไว้ในเดต้าเบส // post รับส่งข้อมูลที่เคร่งเรื่องความปลอภัย ใช้รับ-ส่งผ่านฟอร์มร่วมกับปุ่ม submit ข้อมูลมีขนาดใหญ่
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, //การยืนยันตัวตน
        "Content-Type": "application/json",
      },
      //
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
              บันทึกข้อมูลอาหาร
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รายการอาหาร</p>
              <Select
                native
                value={foodSickness.FoodID} //เก็บค่า
                onChange={handleChange} //onChange ทุกครั้งที่มีการเปลี่ยนค่าในฟิลนั้นๆ
                inputProps={{
                  name: "FoodID", //เข้าถึงข้อมูลfoodid 
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
            <FormControl fullWidth variant="outlined">
              <p>ชนิดของอาหาร</p>
              <Select
                native
                value={foodSickness.FoodTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "FoodTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชนิดของอาหาร
                </option>
                {foodtypes.map((item: FoodTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>อาหารบำบัด</p>
                <Select
                  native
                  value={foodSickness.TherapeuticDietID}
                  onChange={handleChange}
                  inputProps={{
                    name: "TherapeuticDietID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกอาหารบำบัด
                  </option>
                  {therapeuticdiets.map((item: TherapeuticDietsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>รูปแบบการทาน</p>
                <Select
                  native
                  value={foodSickness.EatID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EatID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกรูปแบบการทาน
                  </option>
                  {eats.map((item: EatsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>โรค</p>
                <Select
                  native
                  value={foodSickness.SicknessID}
                  onChange={handleChange}
                  inputProps={{
                    name: "SicknessID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกโรค
                  </option>
                  {sicknesses.map((item: SicknessesInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ผู้บันทึกข้อมูล</p>
                <Select native disabled value={foodSickness.NutritionistID}>
                  <option aria-label="None" value="">
                    {nutritionists?.Name}
                  </option>
                </Select>
              </FormControl>
            </Grid>

            {/* แก้เป็น date  เฉยๆ */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl variant="outlined">
                  <p>วันที่</p>
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/foodsicknesses"
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
        </Grid>
      </Paper>
    </Container>
  );
}

export default FoodSicknessCreate;
