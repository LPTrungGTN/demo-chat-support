import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;

interface Attendance {
  attendanceId: number;
  userId: number;
  fullName: string;
  date: string;
  day: string;
  startEnd: string;
  updateSource: number;
}
interface ResponseData {
  total: number;
  lastPage: number;
  attendances: Attendance[][];
}

export interface LogResponse {
  response_status: number;
  data: ResponseData;
}

export const getAttendanceList = async (
  userId: number,
  from: string,
  to: string,
  tz: number,
  page: number
): Promise<LogResponse> => {
  const API_ATTENDANCE_LIST_URL = `${BASE_URL}/attendance/users/${userId}`;
  const params = {
    from: from,
    to: to,
    tz: tz.toString(),

    page: page.toString(),
  };
  const response = await axios.get<LogResponse>(API_ATTENDANCE_LIST_URL, {
    params,
  });
  return response.data;
};
