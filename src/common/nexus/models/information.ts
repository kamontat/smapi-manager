import type { Response } from "@common/request";
import type { Header } from "..";

interface InformationCategory {
  category_id: number;
  name: string;
  parent_category: false | number;
}

interface Information {
  id: number;
  name: string;
  forum_url: string;
  nexusmods_url: string;
  genre: string;
  file_count: number;
  downloads: number;
  domain_name: string;
  approved_date: number;
  file_views: number;
  authors: number;
  file_endorsements: number;
  mods: number;
  categories: InformationCategory[];
}

interface InformationError {
  code?: number;
  message: string;
}

type SuccessResponse = Response<200, Header, Information>;
type ErrorResponse = Response<401 | 404, Header, InformationError>;
type InformationResponse = SuccessResponse | ErrorResponse;

export default InformationResponse;
export type { Information };
