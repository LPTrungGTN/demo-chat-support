import { StatusLeaveRequestEnums } from "@/app/utils/Enums/StatusLeaveRequestEnums";
import { createRequest } from "@/app/utils/helpers/createRequest";
import {
  DecisionRequestData,
  DecisionRequests,
  GetRequestData,
  ResponseData,
} from "@api/request/types";

const statuses = [
  StatusLeaveRequestEnums.PENDING,
  StatusLeaveRequestEnums.ACCEPT,
  StatusLeaveRequestEnums.REJECT,
  StatusLeaveRequestEnums.PENDING,
  StatusLeaveRequestEnums.PENDING,
  StatusLeaveRequestEnums.REJECT,
  StatusLeaveRequestEnums.ACCEPT,
  StatusLeaveRequestEnums.ACCEPT,
];

export const mockGetLeaveRequestResult: ResponseData<GetRequestData> = {
  response_status: 200,
  data: {
    total: 200,
    lastPage: 30,
    requests: statuses.map((status, index) => createRequest(index + 2, status)),
  },
};

export const generateMockDecisionRequestResult = (
  numRequests: number
): ResponseData<DecisionRequestData> => {
  const requests: DecisionRequests[] = [];

  for (let i = 0; i < numRequests; i++) {
    requests.push({
      requestId: i + 1,
      status: Math.random() > 0.5 ? 1 : 2,
    });
  }

  return {
    response_status: 200,
    data: {
      results: requests,
    },
  };
};
