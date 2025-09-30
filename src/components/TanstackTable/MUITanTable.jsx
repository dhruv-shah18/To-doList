import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";

const columns = [
  { field: "_id", width: 90, headerName: "ID" },
  {
    field: "taskname",
    width: 150,
    headerName: "Task Name",
  },
  {
    field: "completed",
    width: 120,
    headerName: "Completed",
    renderCell: (params) => (
      <input type="checkbox" checked={params.value || false} readOnly />
    ),
  },
  {
    field: "priority",
    width: 110,
    headerName: "Priority",
    renderCell: (params) => (
      <span>{params.value === 'high' ? '🔴': params.value === 'medium' ? '🟡' : '🟢'}</span>
    )
  },
  {
    field: "important",
    width: 120,
    headerName: "Important",
    renderCell: (params) => (
      <input type="checkbox" checked={params.value || false} readOnly />
    ),
  },
];

const MUITanTable = ({ data, pagination }) => {
  const [rows, setRows] = useState(!pagination && data);
  const [totalItems, setTotalItems] = useState(0); // ✅ Total count of rows
  const [filterModel, setFilterModel] = useState({ items: [] });
  const { fetchData } = useFetchHook();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 3,
    page: 0, // ✅ MUI uses 0-based indexing
  });

  const fetchingData = async () => {
    try {
      const response = await fetchData({
        API_URL: API.GETALLTASKS(
          true,
          paginationModel.page + 1, // ✅ Backend uses 1-based pages
          paginationModel.pageSize,
          filterModel.items[0]?.value ? filterModel.items[0]?.value : ""
        ),
      });

      setRows(response.result);
      setTotalItems(response.pageInfo?.totalItems || 0); // ✅ Set rowCount
    } catch (error) {
      console.error("Error fetching paginated tasks:", error);
    }
  };

  useEffect(() => {
    if (pagination) {
      fetchingData();
    } else {
      setRows(data); // fallback if pagination is false
      setTotalItems(data?.length || 0);
    }
  }, [paginationModel, pagination, data, filterModel]);
  

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row._id}
        columnVisibilityModel={{ _id: false }}
        checkboxSelection
        paginationMode="server" // ✅ Tells DataGrid to not paginate itself
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[3, 5, 7]}
        rowCount={totalItems} // ✅ Required for server-side pagination
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
      />
    </Box>
  );
};

export default MUITanTable;
