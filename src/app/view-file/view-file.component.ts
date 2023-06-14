import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { ApprovalService } from '../services/approval.service';
import { GlobalConstant } from '../services/global-constant';
import { ListFileService } from '../services/list-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css'],
})
export class ViewFileComponent implements OnInit {
  data: any;
  id: any;
  doc :any
  md : any
  invoiceheader: any;
  invoicegrid: any;
  invoicefooter: any;
  constructor(
    private fileservice: FileService,
    private listFileService: ListFileService,
    private route: ActivatedRoute,
    private router: Router,
    private approvalSrv: ApprovalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.fileservice.getFileById(this.id).subscribe((event) => {
    this.data = event;
    this.doc = this.data.data;
    this.md = this.doc.Documents[0]
    this.invoiceheader = this.md.Data.InvoiceHeader;
    this.invoicegrid = this.md.Data.TransactionInvoiceGrid;
    this.invoicefooter = this.md.Data.InvoiceFooter;
    console.log("This is md",this.md);
    console.log("this is grid data",this.invoicegrid);
    console.log("Invoice Header: ",JSON.stringify(this.invoiceheader));
    });
  }

  private reqData: any = {"processName":"workflowdemo","amount":"7198","action":"A"};
  private parentUrl = "/admin/listFile";

  approveInvoice()
  {
    this.reqData.procKey = this.approvalSrv.getProcessInfo().processInstanceId;
    this.reqData.taskName = "Approve Invoice";
    console.log("Inside approveInvoice: " + JSON.stringify(this.reqData));
    this.approvalSrv.approveInvoice(this.reqData);
    this.listFileService.deleteFile(this.id).subscribe(data =>{
      console.log("Invoice Deleted: " + JSON.stringify(data));});
    alert("Invoice Approved successfully . . . . .");
    this.router.navigateByUrl(this.parentUrl);
  }

  rejectInvoice()
  {
    this.reqData = {"processName":"workflowDemo","amount":"2000","action":"R"};
    this.approvalSrv.rejectInvoice(this.reqData);
  }
}

 // onProcessDoc(): void {
    // this.fileservice.process().subscribe((event) => {
    //   this.data = event;
    //   //console.log(this.data);
    //   this.parseJSONData(this.data);
   // this.data = GlobalConstant.invcDetail;
   // console.log(this.data);

    // console.log(Object.keys(this.data));
    // console.log(Object.values(this.data));
    // console.log(Object.entries(this.data));
    // });
  

  // private parseJSONData(res: any) {
  //   const doc = res.Documents[0];
  //   this.invoiceheader = doc.Data.InvoiceHeader;
  //   this.invoicegrid = doc.Data.TransactionInvoiceGrid[0];
  //   this.invoicefooter = doc.Data.InvoiceFooter;
    // console.log(this.invoiceheader);
    // console.log(this.invoicegrid);
    // console.log(this.invoicefooter);
 // }

