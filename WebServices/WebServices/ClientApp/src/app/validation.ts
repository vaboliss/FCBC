import { ClientInput } from "./ClientInput";
import { Injectable } from "@angular/core";

export class ValidationClientInput {
  IsValid = false;
  IsGoalValid = true;
  IsFactsValid = true;
  IsFactsValuesValid = true;
  IsRulesValid = true;
  IsRulesLeftSideValid = true;
  IsRulesRightSideValid = true;
  IsRulesURLValid = true;
  IsFactValid = true;
  IsFactValueValid = true;
  IsFactTypeValid = true;
  IsFactValueTypeisValid = true;
}
@Injectable({
  providedIn: "root"
})
export class Validation {

  validation: ValidationClientInput = new ValidationClientInput();

  validateGoal(client: ClientInput) {
    if (client.goal === "" || client.goal === null || client.goal.length > 1) {
      this.validation.IsGoalValid = false;
    } else {
      this.validation.IsGoalValid = true;
    }
  }
  validateFacts(factName: string, factType: string, factValue: string) {
    if (factName === "" || factName.length > 1) {
      this.validation.IsFactValid = false;
    } else {
      this.validation.IsFactValid = true;
    }
    if (factValue === "") {
      this.validation.IsFactValueValid = false;
    }
    else {
      this.validation.IsFactValueValid = true;
    }
    if (factType === "String") {
      this.validation.IsFactTypeValid = true;
      this.validation.IsFactValueTypeisValid = true;
    } else if (factType === "Integer") {
      this.validation.IsFactTypeValid = true;
      if (this.validation.IsFactValueValid) {
        const parsed = parseInt(factValue);
        if (isNaN(parsed)) {
          this.validation.IsFactValueTypeisValid = false;
        }
        else {
          this.validation.IsFactValueTypeisValid = true;
        }
      }
    }
    if (factType === "")
    {
      this.validation.IsFactTypeValid = false;
    }

    if (this.validation.IsFactValid && this.validation.IsFactValueValid &&
      this.validation.IsFactTypeValid && this.validation.IsFactValueTypeisValid) {
      this.validation.IsFactsValid = true;
    }
    else {
      this.validation.IsFactsValid = false;
    }
  }
  validateClient(client: ClientInput): ValidationClientInput {

    if (this.validation.IsGoalValid && client.factsValues.length > 0
      && client.rules.length > 0) {
      this.validation.IsValid = true;
    }
    else {
      this.validation.IsValid = false;
    }

    return this.validation;
  }
  validateRules(procedureOutput: string, procedureInput: string, RuleUrl: string,
  ) {
    console.log("Im here");
    if (procedureOutput === "" || procedureOutput.length > 1 || procedureOutput.length === 0) {
      this.validation.IsRulesLeftSideValid = false;
    } else {
      this.validation.IsRulesLeftSideValid = true;
    }
    if (procedureInput === "") {
      this.validation.IsRulesRightSideValid = false;
    } else {
      this.validation.IsRulesRightSideValid = true;
    }
    if (RuleUrl === "") {
      this.validation.IsRulesURLValid = false;
    } else {
      this.validation.IsRulesURLValid = true;
    }
    if (this.validation.IsRulesLeftSideValid && this.validation.IsRulesRightSideValid &&
      this.validation.IsRulesURLValid) {
      this.validation.IsRulesValid = true;
    } else {
      this.validation.IsRulesValid = false;
    }
  }
}
