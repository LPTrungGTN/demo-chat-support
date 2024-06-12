import { StatusLeaveRequestEnums } from "@enums/StatusLeaveRequestEnums";

export const createRequest = (id: number, status: StatusLeaveRequestEnums) => {
  return {
    requestId: id,
    fullName: "John Doe",
    dateTimeStart: "2023-09-05 09:00",
    dateTimeEnd: "2023-09-05 12:00",
    typeRequest: "Wedding",
    acceptedName: "Nguyen Van B",
    status: Number(status),
    reason: "Sick leave",
  };
};
