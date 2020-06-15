import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelsComponent } from "../../../globals/models/models.component";

@Component({
  selector: 'app-mock-data',
  templateUrl: './mock-data.component.html',
  styleUrls: ['./mock-data.component.css']
})
export class MockDataComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  users: any[];
  courses: any[];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  	this.users = [];
    console.log(this.users);
    this.getAllUsers();
    console.log(this.users);
    this.getAllCourses();
  }

  ngOnInit(): void {
  this.form = this.formBuilder.group({
      cname: ['', Validators.required],
      cnumber: ['', Validators.required],
      profID: ['', Validators.required]
    });
    this.form2 = this.formBuilder.group({
      user: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  addCourse(cname, cnumber, profID){
    // just mock proposes, omitted error verification
    if (this.form.invalid) {
      return;
    }
    this.http.post(ModelsComponent.api + ModelsComponent.version + 'courses', {name:cname,number:Number(cnumber),professorID:profID}).subscribe((data: any) => {
      let message = data.message;
      console.log(message);

      //form validation stoped the next action
      //this.addCourseToUser(Number(profID), data.token._id);
      this.http.put(ModelsComponent.api + ModelsComponent.version + 'users/' + profID, {coursesID:data._id}).subscribe((data: any) => {
        let message = data.message;
        console.log(message);
        this.getAllUsers();
      }, (error: any) => {console.log(error);});
      this.getAllCourses();
    }, (error: any) => {console.log(error);});
  }

  addCourseToUser(user, course){
    // just mock proposes, omitted error verification
    if (this.form2.invalid) {
      return;
    }
    this.http.put(ModelsComponent.api + ModelsComponent.version + 'users/' + user, {coursesID:course}).subscribe((data: any) => {
      let message = data.message;
      console.log(message);
      this.getAllUsers();
    }, (error: any) => {console.log(error);});

  }

  // Get all users from the API
  getAllUsers() {
    this.http.get(ModelsComponent.api + ModelsComponent.version + 'users').subscribe((users : any[] )=> {
      console.log(users);
      this.users = users;
    }, (error: any) => {console.log(error);});
  }

  // Get all users from the API
  getAllCourses() {
    this.http.get(ModelsComponent.api + ModelsComponent.version + 'courses').subscribe((courses : any[] )=> {
      console.log(courses);
      this.courses = courses;
    }, (error: any) => {console.log(error);});
  }
}
