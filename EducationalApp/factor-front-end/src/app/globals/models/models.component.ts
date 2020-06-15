import { Component } from '@angular/core';

@Component({
  selector: 'app-models',
  template: ''
})
export class ModelsComponent {

  static version = '/api/'; //future
  static api = 'http://192.168.1.125:3000'; // s ToDo
  static staticsURL = 'assets/';
  static languages = [
    { code: 'en', label: 'English', img: 'english'},
    { code: 'es', label: 'Español', img: 'spanish'},
    { code: 'fr', label: 'Français', img: 'french'}
  ];

  constructor() { }

  logout() {
    sessionStorage.removeItem('token');
  }
}

export class Error {
  resNum: number;
  resText: string;
  resBool: boolean;

  constructor() {
    this.resBool = false;
  }
}

export class User {
  _id: number;
  token: string;
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  picture: string;
  verified_email: boolean;
  coursesID: string[];
  courses: Course[];
  authlvl:number;


  constructor() {
    this.picture = "";
    this._id = 0;
    this.courses = [];
  }
}

export class Course {
  _id: string;
  name: string;
  number: number;
  professorID: string;
  professor: User;

  constructor() {
    this.professor = new User();
  }
}

export class Video {
  _id: string;
  name: string;
  url: string;
  duration: string;
  class: number;
  thumbnail: string;
  courseID: string;
  course: Course;

  constructor() {
    this.course = new Course();
  }
}
