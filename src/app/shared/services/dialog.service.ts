import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerDialogComponent } from '../components/error-handler-dialog/error-handler-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog,  private zone: NgZone) { }

  openServerErrorDialog(message: string,title:string) {
    this.zone.run(() => {
      this.dialog.open(ErrorHandlerDialogComponent, {
        data: { message ,title },
        panelClass: "dialog-default",
        maxWidth: "750px",
        minWidth: "400px",
        maxHeight: "100vh",
        disableClose: true,
        autoFocus: false,
      });
    });
  }
}
