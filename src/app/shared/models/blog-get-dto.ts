import { AuthorGetDto } from "./author-get-dto";

export interface BlogGetDTO {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  contributors: AuthorGetDto[];
}
