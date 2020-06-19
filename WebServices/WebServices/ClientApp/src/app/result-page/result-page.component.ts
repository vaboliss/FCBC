import { Component, OnInit } from '@angular/core';
import { Response } from '../Response';
import { DataService } from '../DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  response: Response;
  goalValue = "";

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(DataService.response);
    if (DataService.response.result.status !== "") {
      this.response = DataService.response;
      this.findGoalValue();
      console.log(this.goalValue);
    }
    else {
      this.router.navigateByUrl('/');
    }

  }
  findGoalValue() {

    for (let i = 0; i < this.response.information.factsValues.length; i++)
    {
      if (this.response.information.factsValues[i].fact ===
        this.response.information.goal) {
          this.goalValue = this.response.information.factsValues[i].factValue;
        }
    }
    if (this.goalValue === "" ) {
      this.goalValue = "fetching through API's failed, API IS DOWN";
    }
  }

}
