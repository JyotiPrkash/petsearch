import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { GlobalService } from '../global.service';
declare var require: any;
var moment = require('moment');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  petsArr: any;
  sortType: string;
  orderType: string;
  isLoader: boolean = true;

  constructor(private server: ServerService, public global: GlobalService) {
    this.searchQuery = "";
    this.petsArr = [];
  }

  ngOnInit(): void {
    this.fetchPets();
  }

  searchPet() {
    this.server.getSearchedPetData(this.searchQuery).subscribe((response) => {
      this.petsArr = response;
      this.global.petsArr = response;
    }, (error) => {
      console.log(error);
      this.petsArr = [];

    });
  }

  fetchPets() {
    this.isLoader = true;
    this.server.getAllPetsData().subscribe((response) => {
      this.petsArr = response;
      this.global.petsArr = response;
      this.isLoader = false;
    }, (error) => {
      console.log(error);
      this.petsArr = [];
      this.isLoader = false;
    });
  }

  filterByAge(query) {
    this.petsArr = this.global.petsArr;
    this.isLoader = true;
    if (query == "more") {
      var tempArr = this.petsArr.filter(pet => {
        var months = moment().diff(pet.bornAt, 'months', false);
        if (months > 1) {
          return pet
        }
      })
      this.isLoader = false;
    } else {
      var tempArr = this.petsArr.filter(pet => {
        var months = moment().diff(pet.bornAt, 'months', false);
        if (months < 1) {
          return pet
        }
      })
      this.isLoader = false;
    }
    this.petsArr = [];
    this.petsArr = tempArr

  }

  submitFilter() {
    this.isLoader = true;
    if (this.sortType != 'age') {
      let query = '?sortBy=' + this.sortType + '&order=' + this.orderType;

      this.server.getSortPetData(query).subscribe((response) => {
        this.petsArr = response;
      }, (error) => {
        console.log(error);
        this.petsArr = [];

      });
      this.isLoader = false;
    } else {
      if (this.orderType == 'asc') {
        this.petsArr.sort((pet1, pet2) => {
          if (pet1.bornAt > pet2.bornAt) return -1
          if (pet1.bornAt < pet2.bornAt) return 1
        })
      } else {
        this.petsArr.sort((pet1, pet2) => {
          if (pet1.bornAt < pet2.bornAt) return -1
          if (pet1.bornAt > pet2.bornAt) return 1
        })
      }
      this.isLoader = false;
    }
  }

}
