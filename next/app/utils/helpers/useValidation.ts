import { toast } from "react-toastify";

import { FeEnums } from "@enums/FeEnums";

export const validateDateRangeLeaveRequestBox = (from: string, to: string) => {
  const timeTillDateFrom = new Date(from).getTime();
  const timeTillDateTo = new Date(to).getTime();

  if (timeTillDateFrom > timeTillDateTo) {
    toast.error(FeEnums.VALIDATE_ERROR_FROM_BIGGER_TO);
    return false;
  }
  if (isNaN(timeTillDateFrom)) {
    toast.error(FeEnums.VALIDATE_ERROR_FROM_NULL);
    return false;
  }
  if (isNaN(timeTillDateTo)) {
    toast.error(FeEnums.VALIDATE_ERROR_TO_NULL);
    return false;
  }
  return true;
};
