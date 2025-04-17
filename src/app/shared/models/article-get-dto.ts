import { AuthorGetDto } from "./author-get-dto";
import { CategoryGetDto } from "./category-get-dto";

export interface ArticleGetDto {
    id: number;
    title: string;
    subtitle: string | null;
    body: string;
    authorId: number;
    author: AuthorGetDto;
    category: CategoryGetDto;
    dateCreated: string;
    lastUpdated: string;
    numberOfLikes: number;  
    numberOfShares: number;
}