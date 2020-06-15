import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModelsComponent, Error, User, Course, Video} from '../models/models.component';
import { Observable} from 'rxjs';
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
// ToDo don't send request if empty parameters
  constructor(private http: HttpClient, private _fileService: FileService) {}

  toQuery(ids:string[]):string{
    let uri = "";
    for (let i = 0; i < ids.length; i++) {
      uri += "ids="+ids[i]+"&";
    }
    uri = uri.substr(0,uri.length-1);
    return uri;
  }

  /*** login ***/
  login(email,pass): Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'auth', {email, pass})
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get<any>(ModelsComponent.api + ModelsComponent.version + 'auth');
  }

  /*** login callback **/
  callback(code,pass):Observable<User> {
    return this.http.post<User>(ModelsComponent.api + ModelsComponent.version + 'auth/callback', {code, pass})
  }

  /*** Users Info ***/
  getUserAct(id:string): Observable<User> {
    return this.http.get<User>(ModelsComponent.api + ModelsComponent.version + 'users/' + id); //, {withCredentials: true}
  }

  getCoursesInfo(ids:string[]): Observable<Course[]> {
    let queryIDs = this.toQuery(ids);
    return this.http.get<Course[]>(ModelsComponent.api + ModelsComponent.version + 'courses?' + queryIDs); //, {withCredentials: true}
  }

  getVideosInfo(ids:string[]): Observable<Video[]> {
    let queryIDs = this.toQuery(ids);
    return this.http.get<Video[]>(ModelsComponent.api + ModelsComponent.version + 'courses/videos?' + queryIDs);
  }

  getProfessorsInfo(ids:string[]): Observable<User[]> {
    let queryIDs = this.toQuery(ids);
    return this.http.get<User[]>(ModelsComponent.api + ModelsComponent.version + 'users?' + queryIDs);
  }

  getVideoIdInfo(id:string):Observable<Video> {
    return this.http.get<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/' + id);
  }

  editVideoIdInfo(id:string, courseID:string, name:string):Observable<Video> {
    return this.http.put<Video>(ModelsComponent.api + ModelsComponent.version + 'videos/' + id, {course:courseID, name:name});
  }

  getVideoTranscribes(id:string):Observable<any> {
    return this.http.get<any>(ModelsComponent.api + ModelsComponent.version + 'videos/'+ id +'/transcriptions');
  }

  /*** File uploads ***/
  uploadFile(videoForm, file){
    return this.http.post(ModelsComponent.api + ModelsComponent.version + 'videos', this._fileService.toFormData(videoForm, file),
        {reportProgress: true, observe: 'events'}
    )
  }
}
