import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientInput } from '../ClientInput';
import { NotificationsService } from 'angular2-notifications';
import { Rule } from '../Rule';
import { Fact } from '../Fact';
import { DataService } from '../DataService';
import { Response } from '../Response';
import { Router } from '@angular/router';
import { ValidationClientInput, Validation } from '../validation';
import { empty } from 'rxjs';

@Component({
  selector: 'app-backward-chaining',
  templateUrl: './backward-chaining.component.html',
  styleUrls: ['./backward-chaining.component.css']
})
export class BackwardChainingComponent implements OnInit, DoCheck {



  clientInput: ClientInput;

  validationResult = new ValidationClientInput();

  private readonly notifier: NotificationsService;
  private readonly http: HttpClient;

  notificationMessage = "";
  notification = false;
  factName = "";
  factType = "";
  factValue = "";
  ProcedureOutput = "";
  ProcedureInput = "";
  RuleNumber: number;
  RuleUrl = "";
  Add: Boolean = false;
  AddFact: Boolean = false;
    validator: any;

  constructor(private router: Router, http: HttpClient, validator: Validation) {
    this.http = http;
    this.validator = validator;
  }

  ngOnInit() {
    if (DataService.clientInput) {

      this.clientInput = DataService.clientInput;
    } else {
      this.clientInput = new ClientInput();
    }
  }

  ngDoCheck(): void {
    if (this.validationResult)
    {
      this.validator.validateFacts(this.factName, this.factType, this.factValue);
      this.validator.validateGoal(this.clientInput);
      this.validator.validateRules(this.ProcedureOutput, this.ProcedureInput, this.RuleUrl);
      this.validationResult = this.validator.validateClient(this.clientInput);

    }

  }

  AddProcedureButtonPressed() {
    this.Add = true;
  }

  BackwardChaining() {

    var client = this.clientInput;
    for (let i = 0; i < client.rules.length; i++) {
      client.rules[i].RightSide.replace(',', '');
      client.rules[i].RuleNo + 1;
    }
    client.facts = "";
    for (let i = 0; i < client.factsValues.length; i++) {
      client.facts += client.factsValues[i].fact;
    }
    this.http.post(DataService.getBackChainURL, client)
      .subscribe(data => {
        DataService.response = data as Response;
        DataService.clientInput = this.clientInput;
        this.router.navigateByUrl("/result");
      });

  }
  TransferToForward() {
    DataService.clientInput = this.clientInput;
    this.router.navigateByUrl("/forwardChaining");
  }
  AddButtonPressed() {
    this.clientInput.rules.push(
      Object.assign(new Rule(),
        {
          LeftSide: this.ProcedureOutput,
          RightSide: this.ProcedureInput,
          RuleUrl: this.RuleUrl,
          RuleNo: this.clientInput.rules.length + 1,

        }));
    this.ProcedureInput = "";
    this.ProcedureOutput = "";
    this.RuleUrl = "";
    this.Add = !this.Add;
  }
  CancelButtonPressed() {

    this.Add = !this.Add;
    this.ProcedureInput = "";
    this.ProcedureOutput = "";
    this.RuleUrl = "";
  }
  DeleteFactButtonPressed(fact: Fact) {
    var facts = this.clientInput.factsValues;
    this.clientInput.factsValues = [] as Fact[];
    for (let i = 0; i < facts.length; i++) {
      if (facts[i].fact !== fact.fact) {
        this.clientInput.factsValues.push(
          Object.assign(new Fact(),
            {
              fact: facts[i].fact,
              type: facts[i].type,
              factValue: facts[i].factValue,
            }));
      }
    }
  }
  CancelFactButtonPressed() {
    this.AddFact = !this.AddFact;
    this.factName = "";
    this.factType = "";
    this.factValue = "";
  }
  AddFactButtonPressed() {
    this.clientInput.factsValues.push(Object.assign(new Fact(),
      {
        fact: this.factName,
        type: this.factType,
        factValue: this.factValue
      }));
    this.factName = "";
    this.factType = "";
    this.factValue = "";
    this.AddFact = !this.AddFact;
  }
  FirstAddFactButtonPressed() {
    this.factName = "";
    this.factValue = "";
    this.factType = "";
    this.AddFact = !this.AddFact;
  }
  getRightSide(rightside: string)
  {
    var rsplit = rightside.split("");
    rsplit.map(function (item) {
      return item
    }).join(',');
    return rsplit;
  }
  DeleteButtonPressed(rule: Rule) {

    var rules = this.clientInput.rules;
    this.clientInput.rules = [] as Rule[];
    var z = 1;
    for (let i = 0; i < rules.length; i++) {
      if (i !== rule.RuleNo - 1) {
        this.clientInput.rules.push(
          Object.assign(new Rule(),
            {
              LeftSide: rules[i].LeftSide,
              RightSide: rules[i].RightSide,
              RuleUrl: rules[i].RuleUrl,
              RuleNo: z,

            }));
        z++;
      }
    }
  }
}
