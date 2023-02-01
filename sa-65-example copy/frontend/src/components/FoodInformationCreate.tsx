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

import TextField from "@material-ui/core/TextField";

import { NutritionistsInterface } from "../models/INutritionist";
import { FoodsInterface } from "../models/IFood";
import { FoodTypesInterface } from "../models/IFoodType";
import { FoodInformationInterface } from "../models/IFoodInformation";

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

function FoodInformationCreate() {
  const classes = useStyles();
  const [foods, setFoods] = useState<FoodsInterface[]>([]);
  const [foodtypes, setFoodTypes] = useState<FoodTypesInterface[]>([]);
  const [nutritionists, setNutritionists] = useState<
    Partial<NutritionistsInterface>
  >({});
  const [foodInformation, setFoodInformation] = useState<
    Partial<FoodInformationInterface>
  >({});
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
    const name = event.target.name as keyof typeof foodInformation;
    setFoodInformation({
      ...foodInformation,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof FoodInformationCreate;

    const { value } = event.target;

    setFoodInformation({ ...foodInformation, [id]: value });
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

  useEffect(() => {
    getFoods();
    getFoodType();
    getNutritionists();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? Number(data) : data; //Number(data)
    return val;
  };

  function submit() {
    let data = {
      FoodID: convertType(foodInformation.FoodID),
      FoodTypeID: convertType(foodInformation.FoodTypeID),

      Calorie: convertType(foodInformation.Calorie),
      Carbohydrate: convertType(foodInformation.Carbohydrate),
      Protein: convertType(foodInformation.Protein),
      Fat: convertType(foodInformation.Fat),
      Fiber: convertType(foodInformation.Fiber),
      Sodium: convertType(foodInformation.Sodium),
      Phosphorus: convertType(foodInformation.Phosphorus),
      Calcium: convertType(foodInformation.Calcium),

      NutritionistID: convertType(nutritionists?.ID),
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

    fetch(`${apiUrl}/food_informations`, requestOptionsPost)
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
              บันทึกการรายการสารอาหาร
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
                value={foodInformation.FoodID}
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
            <FormControl fullWidth variant="outlined">
              <p>ชนิดของอาหาร</p>
              <Select
                native
                value={foodInformation.FoodTypeID}
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

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ปริมาณแคลอรี่ที่ได้รับ(Kcal)</p>
              <TextField
                id="Calorie"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Calorie || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>ปริมาณสัดส่วนสารอาหารที่ได้รับ</p>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>คาร์โบโอเดรต</p>
              <TextField
                id="Carbohydrate"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Carbohydrate || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>โปรตีน</p>
              <TextField
                id="Protein"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Protein || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>ไขมัน</p>
              <TextField
                id="Fat"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Fat || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>ใยอาหาร</p>
              <TextField
                id="Fiber"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Fiber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>โซเดียม</p>
              <TextField
                id="Sodium"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Sodium || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>ฟอสฟอรัส</p>
              <TextField
                id="Phosphorus"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Phosphorus || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>แคลเซียม</p>
              <TextField
                id="Calcium"
                variant="outlined"
                type="float"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={foodInformation.Calcium || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* //<Grid item xs={3}></Grid>    */}

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>นักโภชนาการ</p>
              <Select
                native
                disabled
                value={foodInformation.NutritionistID}
                /*onChange={handleChange}
                inputProps={{
                  name: "StaffID",
                }}*/
              >
                <option aria-label="None" value="">
                  {nutritionists?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/food_informations"
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

export default FoodInformationCreate;
