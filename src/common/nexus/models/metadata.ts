import type { Response } from "@common/request";
import type { Header } from "..";

interface Metadata {
  category_id: number;
  endorsement_count: number;
  updated_timestamp: number;
  version: string;
}

interface MetadataError {
  message: string;
}

type SuccessResponse = Response<200, Header, Metadata>;
type ErrorResponse = Response<401 | 404, Header, MetadataError>;
type MetadataResponse = SuccessResponse | ErrorResponse;

export default MetadataResponse;
