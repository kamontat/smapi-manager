import type { Response } from "@common/request";
import type { Header } from "..";

interface Validated {
  user_id: number;
  key: string;
  name: string;
  "is_premium?": boolean;
  "is_supporter?": boolean;
  email: string;
  profile_url: string | null;

  is_premium: boolean;
  is_supporter: boolean;
}

interface ValidateError {
  message: string;
}

type SuccessResponse = Response<200, Header, Validated>;
type ErrorResponse = Response<401, Header, ValidateError>;
type ValidatedResponse = SuccessResponse | ErrorResponse;

export default ValidatedResponse;
