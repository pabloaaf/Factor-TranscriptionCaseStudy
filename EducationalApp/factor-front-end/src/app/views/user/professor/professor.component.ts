import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { HttpService } from '../../../globals/helpers/http.service';
import { ModelsComponent, Course, User, Video } from "../../../globals/models/models.component";
import { FileService } from "../../../globals/helpers/file.service";

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  userInfo:User;
  coursesInfo:Course[];
  videoInfo:Video;
  uploadVideoForm: FormGroup;
  submitted = false;
  progress = 0;
  file: File | null = null;
  videosInfo:Video[];
  uri:string;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor(private formBuilder: FormBuilder, private _httpService: HttpService, private _fileService: FileService, private host: ElementRef<HTMLInputElement>) {
      this.uri = ModelsComponent.api+ModelsComponent.version;
      let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
      this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
          this.userInfo = <User>us;
          this._httpService.getCoursesInfo(this.userInfo.coursesID).subscribe(courses => {
            this.coursesInfo = <Course[]>courses;
          });
          this._httpService.getVideosInfo(this.userInfo.coursesID).subscribe(videos => {
            this.videosInfo = <Video[]>videos;
          });
      }, err => console.log(err));
  }

  ngOnInit(): void {
  	this.uploadVideoForm = this.formBuilder.group({
      course: ['', Validators.required],
      video: ['', [Validators.required, this._fileService.requiredFileType('mp4')]]
    });
  }

  get f() { return this.uploadVideoForm.controls; }

  public saveVideo() {
      this.submitted = true;

      // stop the process here if form is invalid
      if (this.uploadVideoForm.invalid) {
        return;
      }

      this._httpService.uploadFile(this.uploadVideoForm.value, this.file).pipe(
          this._fileService.uploadProgress(progress => (this.progress = progress)),
          this._fileService.toResponseBody()
      ).subscribe((data: any) => {
          this.progress = 0;
          //this.uploadVideoForm.reset();
          this.videoInfo = data;
          console.log(this.videoInfo);
          // do something with the response
      }, (error: any) => {
          console.log(error);
      });
  }
}
