import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { File } from '../services/fileu';
import { GlobalConstant } from '../services/global-constant';
import { ApprovalService } from '../services/approval.service';
import { ListFileService } from '../services/list-file.service';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  data: any;
  id: any;
  doc :any
  md : any
  invoiceheader: any;
  invoicegrid: any;
  invoicefooter: any;
  filesL: File[] =[];
  p: Number = 1;
  count: Number = 5;
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];

  constructor(
    private fileService:ListFileService,
    private service: FileService,
    private router:Router,
    private approvalSrv: ApprovalService
    ) { }

  ngOnInit(): void {
    this.getFiles();
    // this.service.getFileById(this.id).subscribe((event) => {
    //   this.data = event;
    // this.doc = this.data.data;
    // this.md = this.doc.Documents[0]
    // this.invoiceheader = this.md.Data.InvoiceHeader;
    // this.invoicegrid = this.md.Data.TransactionInvoiceGrid;
    // this.invoicefooter = this.md.Data.InvoiceFooter;
    // console.log(this.md);
    // console.log(this.invoicegrid);
    // });
  }

  private getFiles() {
       this.fileService.getFileList().subscribe((event) => {
         console.log(event)
         this.filesL = event;
          this.data = this.filesL[0];
          console.log(this.data)
          this.md = this.data.data.Documents[0];
          this.invoiceheader = this.md.Data.InvoiceHeader;
          console.log("This is invoiceheader",this.invoiceheader);
          this.invoicefooter = this.md.Data.InvoiceFooter;
         GlobalConstant.invcDetail = this.filesL;
        // console.log(GlobalConstant.invcDetail)
       });
     }

     refreshPage() {
      this.getFiles();
     }

     fileDetails(id : number){
       this.launchApprovalFlow(id);
       this.router.navigate(['view-file',id]);
     }

     updateFile(id:number) {
       this.router.navigate(['update-file',id]);
     }

     deleteFile(id:number) {
       this.fileService.deleteFile(id).subscribe(data =>{
         console.log("Invoice Deleted: " + JSON.stringify(data));
         this.getFiles();
       })
     }
     
    private reqData: any = {"processName":"workflowdemo","amount":"7198","action":"A"};
    launchApprovalFlow(id:number)
    {
      this.reqData = {"processName":"workflowDemo","amount":"7198","action":"A"};
      this.approvalSrv.launchApprovalFlow(this.reqData);
    }

}
