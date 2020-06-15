import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globals/helpers/http.service';
import { ModelsComponent, Course, User, Video } from "../../../globals/models/models.component";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  userInfo:User;
  coursesInfo:Course[];
  professorInfo:User[];
  videosInfo:Video[];
  uri:string;

  constructor(private _httpService: HttpService) {
    this.uri = ModelsComponent.api+ModelsComponent.version;
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getCoursesInfo(this.userInfo.coursesID).subscribe(courses => {
        this.coursesInfo = <Course[]>courses;
        let professorsID = [];
        for (let i = 0; i < this.coursesInfo.length; i++) {
          professorsID[i] = Number(this.coursesInfo[i].professorID);
        }
        this._httpService.getProfessorsInfo(professorsID).subscribe(prof => {
          this.professorInfo = <User[]>prof;
        });
      });
      this._httpService.getVideosInfo(this.userInfo.coursesID).subscribe(videos => {
        this.videosInfo = <Video[]>videos;
      });
    }, err => console.log(err));
  }

  ngOnInit(): void {
  }

}
