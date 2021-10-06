import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  getAllPetsData() {
    return this.http.get(this.global.apiEndpoints + this.global.fetchPetsAPI);
  }

  getSearchedPetData(query) {
    return this.http.get(this.global.apiEndpoints + this.global.searchPetsAPI + query);
  }
  getSortPetData(query) {
    return this.http.get(this.global.apiEndpoints + this.global.fetchPetsAPI + query);
  }
}
