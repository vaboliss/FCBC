import { Rule } from "./Rule";
import { Fact } from "./Fact";

export class ClientInput {
  goal = "";
  facts = ""; 
  factsValues: Fact[] = [];
  rules: Rule[] = [];
}
