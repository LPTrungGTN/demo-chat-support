import { toast } from "react-toastify";

import { exportSheet } from "@/app/api/exportSheet";
import { FeEnums } from "@enums/FeEnums";

export const handleExportSheetButton = () => {
  try {
    exportSheet();
    toast.success(FeEnums.EXPORT_SHEET_SUCCESS);
  } catch (error) {
    console.error(error);
    toast.error("Export Sheet failed");
  }
};
