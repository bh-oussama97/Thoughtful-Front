import { AuthorGetDto } from "./author-get-dto";


export interface BlogGetDTO {
    id: number;
    name: string;
    description: string;
    dateCreated: string;
    contributors: AuthorGetDto[];
}