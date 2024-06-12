 import axios from "@/app/api/axiosInstance";

 const BASE_URL = process.env.BASE_URL;
 const API_GET_LEAVE_REQUEST_TYPE_URL = `${BASE_URL}/requests/sub_types`;

 interface RequestType {
   id: number;
   parentId: number;
   name: string;
   timeLeft: number;
 }

 interface ResponseData {
   requestTypes: RequestType[];
 }

 interface LogResponse {
   response_status: number;
   data: ResponseData;
 }

 export const subLeaveRequestType = async (
   parentId: number
 ): Promise<LogResponse> => {
   const param = {
     parentId: parentId,
   };
   const response = await axios.get<LogResponse>(
     API_GET_LEAVE_REQUEST_TYPE_URL,
     { params: param }
   );
   return response.data;
 };
