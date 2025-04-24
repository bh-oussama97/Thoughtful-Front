import { UserGetDTO } from "./user-get-dto";

export interface BlogContributorDto {
    blogId: number;
    userId: string;
    note: string;
    filename: string;
    contributionDate: string;
    user: UserGetDTO;
    image: string;
}