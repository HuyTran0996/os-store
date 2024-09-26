import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";

export default function DataGridTable({
  rows,
  columns,
  isLoading,
  isLoadingSelf,
  rowModesModel,
  handleRowModesModelChange,
  processRowUpdate,
  EditToolbar,
}) {
  //////////////MUI DATA GRID functions, no need to care this//////////

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  ///////////////////////////

  return (
    <Box
      sx={{
        width: "100%",

        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        loading={isLoading || isLoadingSelf}
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooter
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            isLoadingSelf,
          },

          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
      />
    </Box>
  );
}
