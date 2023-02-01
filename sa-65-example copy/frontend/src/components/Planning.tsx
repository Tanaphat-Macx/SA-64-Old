import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { NutritionistsInterface } from "../models/INutritionist";
import { format } from "date-fns";
import { PlanningInterface } from "../models/IPlanning";

function Plannings() {
  const [plannings, setPlanning] = useState<PlanningInterface[]>([]);
  const apiUrl = "http://localhost:8080";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getPlanning = async () => {
    fetch(`${apiUrl}/plannings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("planning", res.data);
        if (res.data) {
          setPlanning(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "PatientName",
      headerName: "ชื่อผู้ป่วย",
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, "Limit").Patient.Name;
      },
    },
    {
      field: "PatientAllergy",
      headerName: "อาหารที่แพ้",
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, "Limit").Patient.Allergy;
      },
    },
    {
      field: "Should_Eat",
      headerName: "อาหารที่ควรทาน",
      width: 150,
      valueGetter: (params) => {
        return params.getValue(params.id, "Limit").Should_Eat.Name;
      },
    },
    {
      field: "MealName",
      headerName: "มื้ออาหาร",
      width: 80,
      valueGetter: (params) => {
        return params.getValue(params.id, "Meal").Name;
      },
    },
    {
      field: "FoodName",
      headerName: "รายการอาหาร",
      width: 150,
      valueGetter: (params) => {
        return params.getValue(params.id, "Food").Name;
      },
    },
    {
      field: "PnDate",
      headerName: "วันที่",
      width: 100,
      valueFormatter: (params) => format(new Date(params?.value), "dd/MM/yyyy"),
    },
    {
      field: "NutritionistName",
      headerName: "นักโภชนาการ",
      width: 150,
      valueGetter: (params) => {
        return params.getValue(params.id, "Nutritionist").Name;
      },
    },
  ];

  useEffect(() => {
    getPlanning();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
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
              ข้อมูลการวางแผนรายการอาหาร
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/planning/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={plannings}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Plannings;
