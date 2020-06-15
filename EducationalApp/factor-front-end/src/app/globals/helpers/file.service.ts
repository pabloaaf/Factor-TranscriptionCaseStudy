import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  public requiredFileType(type:string) {
    return function (control: FormControl) {
      let file = control.value;
      if (file) {
        let extension = file.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true
          };
        }
        return null;
      }
    }
  }

  public toFormData<T>( formValue: T, file ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    formData.append('video', file, file.name);
    return formData;
  }

  public toResponseBody<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    );
  }

  public uploadProgress<T>( cb: ( progress: number ) => void ) {
    return tap(( event: HttpEvent<T> ) => {
      if ( event.type === HttpEventType.UploadProgress ) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }
}
