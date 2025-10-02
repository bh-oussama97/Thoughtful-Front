import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { AppRoutingModule } from "./app.routing";
import { ArticlesListComponent } from "./articles/articles-list/articles-list.component";
import { AuthorsListComponent } from "./authors/authors-list/authors-list.component";
import { BlogsListComponent } from "./blogs/blogs-list/blogs-list.component";
import { ArticleDetailsModalComponent } from "./articles/article-details-modal/article-details-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationInterceptor } from "./shared/interceptors/authorization.interceptor";
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";
import { AddCategoryArticleModalComponent } from "./articles/add-category-article-modal/add-category-article-modal.component";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { AddAuthorArticleModalComponent } from "./articles/add-author-article-modal/add-author-article-modal.component";
import { AddArticleModalComponent } from "./articles/add-article-modal/add-article-modal.component";
import { EditArticleModalComponent } from "./articles/edit-article-modal/edit-article-modal.component";
import { AddContributionModalComponent } from "./blogs/add-contribution-modal/add-contribution-modal.component";
import { ViewContributionsModalComponent } from "./blogs/view-contributions-modal/view-contributions-modal.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./home/home.component";
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';

export function tokenGetter() {
  return localStorage.getItem("Token");
  }
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ArticlesListComponent,
    BlogsListComponent,
    AuthorsListComponent,
    ArticleDetailsModalComponent,
    AddCategoryArticleModalComponent,
    AddAuthorArticleModalComponent,
    AddArticleModalComponent,
    EditArticleModalComponent,
    AddContributionModalComponent,
    ViewContributionsModalComponent,
    HomeComponent,
    UserProfileComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options),
    ToastModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
