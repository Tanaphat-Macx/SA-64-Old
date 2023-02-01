import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { PatientsInterface } from "../models/IPatient";

import { format } from "date-fns";

function Patients() {
  const [patients, setPatients] = useState<PatientsInterface[]>([]);

  const getPatients = async () => {
    const apiUrl = "http://localhost:8080/patients";

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setPatients(res.data);
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { field: "Idcard", headerName: "เลขบัตรประจำตัวประชาชน", width: 200 },

    // คำนำหน้าชื่อ
    {
      field: "NametitleType",
      headerName: "คำนำหน้าชื่อ",
      width: 100,

      valueGetter: (params) => {
        return params.getValue(params.id, "Nametitle").Type;
      },
    },

    { field: "Name", headerName: "ชื่อ - นามสกุล", width: 150 },
    { field: "Age", headerName: "อายุ", width: 50 },
    {
      field: "Bday",
      headerName: "วันเดือนปีเกิด",
      width: 150,
      valueFormatter: (params) => format(new Date(params?.value), "dd-MM-yyyy"),
    },

    // //เพศ
    {
      field: "GenderType",
      headerName: "เพศ",
      width: 100,
      valueGetter: (params) => {
        return params.getValue(params.id, "Gender").Type;
      },
    },

    { field: "Allergy", headerName: "ประวัติการแพ้อาหาร/ยา", width: 200 },
    { field: "Sickness", headerName: "โรคประจำตัว", width: 200 },
    {
      field: "Datetime",
      headerName: "วันที่เข้ารับการรักษา (วันเดือนปี)",
      width: 200,
      valueFormatter: (params) => format(new Date(params?.value), "dd-MM-yyyy"),
    },

    // //ผู้บันทึกข้อมูล
    {
      field: "UserName",
      headerName: "ผู้บันทึกข้อมูล",
      width: 150,
      valueGetter: (params) => {
        return params.getValue(params.id, "User").Name;
      },
    },
  ];

  useEffect(() => {
    getPatients();
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
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ประวัติข้อมูลผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/patients/create"
              variant="contained"
              color="primary"
            >
              เพิ่มข้อมูลผู้ป่วย
            </Button>
          </Box>
        </Box>
        <div style={{ height: 550, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={patients}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Patients;
