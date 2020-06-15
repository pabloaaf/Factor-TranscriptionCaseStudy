import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../globals/helpers/http.service';
import { ModelsComponent, Course, User, Video } from "../../../globals/models/models.component";

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {
  uri: string;
  userInfo: User;
  videoInfo: Video;
  videoTranscribes: any;
  public phrases: Array<{start: number, end: number, p:string}> = [];
  @ViewChild('vid', {static: false}) video: ElementRef;

  constructor(private _httpService: HttpService, private route: ActivatedRoute, private ref: ChangeDetectorRef) {
    this.uri = ModelsComponent.api+ModelsComponent.version; //localhost
    let id = this.route.snapshot.paramMap.get('id');
    let token = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    this._httpService.getUserAct(token._id).subscribe(us => { // servicio http devuelve la info del usuario
      this.userInfo = <User>us;
      this._httpService.getVideoIdInfo(id).subscribe(video => {
        this.videoInfo = <Video>video;
        this._httpService.getVideoTranscribes(id).subscribe(transcribes => {
          this.videoTranscribes = transcribes;
          let phraseAct = "";
          let startT = 0;
          let endT = 0;
          for (let i = 0; i < this.videoTranscribes.result.item.length; i++) {
            if(this.videoTranscribes.result.item[i].type == "punctuation"){
              phraseAct += this.videoTranscribes.result.item[i].alternatives[0].content;
              if(this.videoTranscribes.result.item[i+1] != undefined){
                endT = Number(this.videoTranscribes.result.item[i+1].start_time);
              } else{
                endT = Number.MAX_VALUE;
              }
              this.phrases.push({start:startT,end:endT,p:phraseAct});
              phraseAct = "";
              startT = endT;
            } else {
              phraseAct += " " + this.videoTranscribes.result.item[i].alternatives[0].content;
            }
          }
          console.log(this.phrases);
        });
      });
    });
  }

  ngOnInit(): void {
  }

  public setVideoTime(time:string) {
    this.video.nativeElement.currentTime = Number.parseInt(time);
    //console.log(this.video.nativeElement.currentTime);
    this.video.nativeElement.scrollIntoView({behavior:"smooth"});

  }

  public resetPhrase() {
    this.ref.detectChanges();
  }
}
