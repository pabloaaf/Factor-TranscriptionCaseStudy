import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../globals/helpers/http.service';
import { ModelsComponent, Course, User, Video } from "../../../globals/models/models.component";

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  uri: string;
  userInfo:User;
  coursesInfo:Course[];
  videoInfo:Video;
  editVideoInfoForm: FormGroup;
  submitted = false;

  constructor(private _httpService: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.uri = ModelsComponent.api+ModelsComponent.version;
    
  }

  ngOnInit(): void {
  	this.editVideoInfoForm = this.formBuilder.group({
      course: ['', Validators.required],
      name: ['', Validators.required]
    });
    let id = this.route.snapshot.paramMap.get('id');
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getCoursesInfo(this.userInfo.coursesID).subscribe(courses => {
        this.coursesInfo = <Course[]>courses;
      });
      this._httpService.getVideoIdInfo(id).subscribe(video => {
        this.videoInfo = <Video>video;
        this.editVideoInfoForm.controls['course'].setValue(this.videoInfo.courseID);
        this.editVideoInfoForm.controls['name'].setValue(this.videoInfo.name);
      });
    }, err => console.log(err));
  }

  get f() { return this.editVideoInfoForm.controls; }

  public editVideo() {
    this.submitted = true;

    // stop the process here if form is invalid
    if (this.editVideoInfoForm.invalid) {
      return;
    }
    this._httpService.editVideoIdInfo(this.videoInfo._id, this.videoInfo.courseID, this.videoInfo.name).subscribe(video => {
      this.videoInfo = <Video>video;
    });
  }
  public DeleteClassVideo() {

  }
}
