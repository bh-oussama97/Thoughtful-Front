import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { ArticlesListComponent } from "./articles/articles-list/articles-list.component";
import { BlogsListComponent } from "./blogs/blogs-list/blogs-list.component";
import { AuthorsListComponent } from "./authors/authors-list/authors-list.component";
import { AuthGuardService } from "./shared/guards/auth.guard";
import { LoginGuard } from "./shared/guards/login.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: "articles",
    component: ArticlesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "blogs",
    component: BlogsListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "authors",
    component: AuthorsListComponent,
    canActivate: [AuthGuardService]
  },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
