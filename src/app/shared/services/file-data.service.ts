import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class FileDataService {
    private fileDataSource = new BehaviorSubject<{content: string }[]>([]);
    currentFileData = this.fileDataSource.asObservable();

    constructor() { }

    updateFileData(data: any[]) {
        this.fileDataSource.next(data);
    }
}