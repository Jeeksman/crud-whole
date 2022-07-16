import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

   constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
   
    this.getparamid = this.router.snapshot.paramMap.get('id')
    this.service.getSingledata(this.getparamid).subscribe((res)=>{
      console.log(res,"res==>")
      console.log(res['data'][0],"0")
      this.userform.patchValue({
        UserName:res['data'][0]['Username'],
        eMail:res['data'][0]['email'],
        DOB:res['data'][0]['DOB']
      });
    })
  }

  userform = new FormGroup({
    'UserName':new FormControl('',Validators.required),
    'eMail':new FormControl('',Validators.required),
    'DOB':new FormControl('',Validators.required)

  });

  userSubmit()
  {
      if(this.userform.valid)
      {
        console.log(this.userform.value);
      this.service.createData(this.userform.value).subscribe((res)=>{
        console.log(res,"res==>")
        this.successmsg=res.message;
      })
      }
      else
      this.errormsg = 'all field required !';
  }

  // updatedata

  userUpdate()
  {
    console.log(this.userform.value,'updatedform')

    if(this.userform.valid)
    {
        this.service.UpdateID(this.userform.value,this.getparamid).subscribe((res)=>{
              console.log(res,'resupdated')
          })
    }else
    {

    }
  }
}
