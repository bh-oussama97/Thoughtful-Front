import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ErrorHandlerDialogComponent } from "./components/error-handler-dialog/error-handler-dialog.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatMenuModule } from "@angular/material/menu";
import { YesNoConfirmComponent } from "./components/yes-no-confirm/yes-no-confirm.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {BreadcrumbModule} from 'xng-breadcrumb';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorHandlerDialogComponent,
    YesNoConfirmComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    FontAwesomeModule,
    BreadcrumbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    BreadcrumbModule
  ],
  providers: [JwtHelperService]
})
export class SharedModule {}
