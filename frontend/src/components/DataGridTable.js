import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";

export default function DataGridTable({
  rows,
  columns,
  isLoading,
  isLoadingSelf,
  setIsLoadingSelf,
  rowModesModel,
  handleRowModesModelChange,
  processRowUpdate,
  EditToolbar,
  rowHeight,
  filter,
  setFilter,
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
        boxShadow: "5px 10px 10px #888888",

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
        rowHeight={rowHeight || 52}
        hideFooter
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            isLoadingSelf,
            setIsLoadingSelf,
            isLoading,
            filter,
            setFilter,
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
