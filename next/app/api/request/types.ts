interface BaseRequestData {
  requestId: number;
  fullName: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  typeRequest: string;
  status: number;
}

export interface HistoryRequestData extends BaseRequestData {
  confirmedName?: string;
  reason?: string;
}

export interface ResponseData<T> {
  response_status: number;
  data: T;
}

export interface GetRequestData {
  total: number;
  lastPage: number;
  requests: HistoryRequestData[];
}

export interface DecisionRequestData {
  results: DecisionRequests[];
}

export interface DecisionRequests {
  requestId: number;
  status: number;
}
