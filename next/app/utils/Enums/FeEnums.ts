export enum FeEnums {
  // success message
  CREATE_LEAVE_REQUEST_MESSAGE_SUCCESS = "You have successfully created a leave request.",
  UPDATE_SUCCESS = "You have successfully updated.",
  EXPORT_SHEET_SUCCESS = "You have successfully exported the sheet.  We will send you an email when the sheet is ready.",
  // null error
  VALIDATE_ERROR_DATE_NULL = "Day field is missing.  Please choose day. ",
  VALIDATE_ERROR_FROM_NULL = "Day from filed is missing. Please enter a valid date.",
  VALIDATE_ERROR_TO_NULL = "Day to filed is missing. Please enter a valid date.",
  VALIDATE_ERROR_SUB_TYPE_NULL = "Sub type field is missing.  Please choose leave type. ",
  // invalid value error
  VALIDATE_ERROR_FROM_BIGGER_NOW = "Day from is later than today. Please enter a valid date.",
  VALIDATE_ERROR_TO_BIGGER_NOW = "Day to is later than today. Please enter a valid date.",
  VALIDATE_ERROR_FROM_BIGGER_TO = "Day from is later than day to. Please enter a valid date.",
  VALIDATE_ERROR_NO_SELECTED = "You need to choose at least 1 item.",
  //warning message
  WARNING_MESSAGE_LEAVE_REQUEST_NULL = "You don't have any leave days left. Please choose no paid leave. ",
}
