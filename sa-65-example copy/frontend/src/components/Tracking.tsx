import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { NutritionistsInterface } from "../models/INutritionist";
import { TrackingEvaluationInterface } from "../models/ITrackingEvaluation";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

function Tracking() {
  const [tracking, setTracking] = useState<TrackingEvaluationInterface[]>([]);

  const getTracking = async () => {
    const apiUrl = "http://localhost:8080/tracking";

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, //การยืนยันตัวตน
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setTracking(res.data);
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 20 },
    {
      field: "PlanningName",
      headerName: "ชื่อ-นามสกุล(ผู้ป่วย)",
      width: 215,
      valueGetter: (params) => {
        return params.getValue(params.id, "Planning").Limit.Patient.Name;
      },
    },
    {
      field: "MealName",
      headerName: "มื้ออาหาร",
      width: 215,
      valueGetter: (params) => {
        return params.getValue(params.id, "Planning").Meal.Name;
      },
    },
    {
      field: "เมนูอาหาร",
      headerName: "เมนูอาหาร",
      width: 215,
      valueGetter: (params) => {
        return params.getValue(params.id, "Planning").Food.Name;
      },
    },
    {
      field: "ปัญหาการรับประทานอาหาร",
      headerName: "ปัญหาการรับประทานอาหาร",
      width: 220,
      valueGetter: (params) => {
        return params.getValue(params.id, "ProblemEating").Name;
      },
    },
    {
      field: "ปัญหาด้านน้ำหนัก",
      headerName: "ปัญหาด้านน้ำหนัก",
      width: 220,
      valueGetter: (params) => {
        return params.getValue(params.id, "WeightProblem").Name;
      },
    },
    { field: "Note", headerName: "หมายเหตุเพิ่มเติม", width: 215 },
    {
      field: "NutritionalStatusName",
      headerName: "ภาวะโภชนาการ",
      width: 215,
      valueGetter: (params) => {
        return params.getValue(params.id, "NutritionalStatus").Name;
      },
    },
    {
      field: "NutritionistName",
      headerName: "ผู้บันทึกข้อมูล",
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, "Nutritionist").Name;
      },
    },

    {
      field: "Date",
      headerName: "วันที่และเวลา",
      width: 170,
      valueFormatter: (params) => format(new Date(params?.value), "P hh:mm a"),
      // moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
  ];

  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];

  // const columns: GridColDef[] = [
  //   { field: "col1", headerName: "Column 1", width: 150 },
  //   { field: "col2", headerName: "Column 2", width: 150 },
  // ];

  useEffect(() => {
    getTracking();
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
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
              สรุปผลการประเมินภาวะโภชนาการ
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/trackingcreate"
              variant="contained"
              color="primary"
            >
              สร้างการประเมินภาวะโภชนาการ
            </Button>
          </Box>
        </Box>

        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={tracking}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Tracking;
