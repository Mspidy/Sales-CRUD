import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { SalesModel } from './sales-dash board.model';


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {

  formValue!:FormGroup;
  salesModelObject:SalesModel=new SalesModel();
  salesData!:any;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  // here i'm using reactive forms
  //one api services we use

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      date:[''],
      name:[''],
      quantity:[''],
      price:['']
    })
    this.getAllSales();
  }

  postSalesDetails(){
    this.salesModelObject.date=this.formValue.value.date;
    this.salesModelObject.name=this.formValue.value.name;
    this.salesModelObject.quantity=this.formValue.value.quantity;
    this.salesModelObject.price=this.formValue.value.price;

    this.api.postSales(this.salesModelObject)
      .subscribe(res=>{
        console.log(res);
        alert("Sales Detail Added Succesfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSales();
      },
      err=>{
        alert("Something we wrong")
      })
  }
  getAllSales(){
    this.api.getSales()
      .subscribe(res=>{
        this.salesData= res;
      })
  }

  deleteSales(row:any){
    this.api.deleteSales(row.id)
      .subscribe(res=>{
        alert("Employe Deleted");
        this.getAllSales();
      })
  }

  onEdit(row:any){
    this.salesModelObject.id=row.id;
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['price'].setValue(row.price);
  }

  updateSalesDetails(){
    this.salesModelObject.date=this.formValue.value.date;
    this.salesModelObject.name=this.formValue.value.name;
    this.salesModelObject.quantity=this.formValue.value.quantity;
    this.salesModelObject.price=this.formValue.value.price;

    this.api.updateSales(this.salesModelObject,this.salesModelObject.id)
      .subscribe(res=>{
        alert("updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSales();
      })
  }
  
}
