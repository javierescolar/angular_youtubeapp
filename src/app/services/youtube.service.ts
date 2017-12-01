import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrlApi:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "YOU API HERE";
  private playList:string = "UUvnx_5LqODateuzBTLOdPfA";
  private nextPageToken:string;

  constructor(
    private _http: Http
  ) { }

  getVideos(){
    let url = `${this.youtubeUrlApi}/playlistItems`;
    let params = new URLSearchParams();
    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId',this.playList);
    params.set('key',this.apiKey);

    if(this.nextPageToken) {
      params.set('nextPageToken',this.nextPageToken);
    }

    return this._http.get(url, {search:params})
      .map(res=>{
        this.nextPageToken = res.json().nextPageToken;

        let videos:any[] = [];
        for(let video of res.json().items){
          let snippet = video.snippet;
          videos.push(snippet);
        }
        return videos;

      });

  }

}
