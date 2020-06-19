import { ClientInput } from "./ClientInput";
import { Protocol } from "./Protocol";
import { Result } from "./Result";

export class Response {
  information: ClientInput = new ClientInput();
  protocol: Protocol[] = [];
  result: Result = new Result();
}
