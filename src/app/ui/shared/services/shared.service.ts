import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs/internal/Subject";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private data = new Subject<string>();

  data$ = this.data.asObservable();

  characters: string[] = [
    'Luke Skywalker',
    'Darth Vader',
    'Han Solo',
    'Leia Organa',
    'Wilhuff Tarkin',
    'Chewbacca',
  ];

  updateData(data: string) {
    this.data.next(data);
  }

}