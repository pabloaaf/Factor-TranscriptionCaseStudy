import { ModelsComponent, Course, User, Video } from "../app/globals/models/models.component";
let USER_OBJECT = new User();
let COURSE_OBJECT = new Course();
let VIDEO_OBJECT = new Video();
import { Observable, of } from 'rxjs';

export class MockHTTP {

    /*** login ***/
  login(email,pass): Observable<User> {
	USER_OBJECT.authlvl = 1;
    return of(USER_OBJECT);
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return of('dvvsvs');
  }

  /*** login callback **/
  callback(code,pass):Observable<User> {
	USER_OBJECT.authlvl = 1;
    return of(USER_OBJECT);
  }

  /*** Users Info ***/
  getUserAct(id:number): Observable<User> {
	USER_OBJECT.authlvl = 1;
    return of(USER_OBJECT);
  }

  getCoursesInfo(ids:string[]): Observable<Course[]> {
	COURSE_OBJECT.name = "ddd";
	let courses = [COURSE_OBJECT];
    return of(courses);
  }

  getVideosInfo(ids:string[]): Observable<Video[]> {
	let videos = [VIDEO_OBJECT];
    return of(videos);
  }

  getProfessorsInfo(ids:number[]): Observable<User[]> {
	USER_OBJECT.authlvl = 1;
    return of([USER_OBJECT]);
  }

  getVideoIdInfo(id:string):Observable<Video> {
    return of(VIDEO_OBJECT);
  }

  editVideoIdInfo(id:string, courseID:string, name:string):Observable<Video> {
    return of(VIDEO_OBJECT);
  }

  getVideoTranscribes(id:string):Observable<any> {
    return of();
  }

  /*** File uploads 
  uploadFile(videoForm, file){
    return this.http.post(GlobalsComponent.api + GlobalsComponent.version + 'videos', this._fileService.toFormData(videoForm, file),
        {reportProgress: true, observe: 'events'}
    )
  }***/
}