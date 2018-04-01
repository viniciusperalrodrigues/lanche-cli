import { Component } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

export var url: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: Http) {
   
    
  }



  loadUrls():Observable<String> {
    this.http.get('assets/api-url.json').subscribe((res: Response) => {
      url = res.json().url;
    });

    return this.http.get('assets/api-url.json').map(res => res.json());
  }
}
