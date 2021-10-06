import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  apiEndpoints: string;
  fetchPetsAPI: string;
  searchPetsAPI: string;
  petsArr: any;
  constructor() {
    this.apiEndpoints = "https://60d075407de0b20017108b89.mockapi.io/api/v1/";
    this.fetchPetsAPI = "animals";
    this.searchPetsAPI = "animals?search=";
    this.petsArr = [];
  }
}
