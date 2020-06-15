import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoPhrase',
  pure: false
})
export class VideoPhrasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(args[0]);
    if(value.start <= args[0] && value.end > args[0]){
        return true;
    }
    return false;
  }

}
