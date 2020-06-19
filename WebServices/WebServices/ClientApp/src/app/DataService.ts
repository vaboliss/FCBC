import { ClientInput } from "./ClientInput";
import { Response } from "./Response";
export class DataService
{
  static clientInput: ClientInput = new ClientInput();
  static response: Response = new Response();
  static getBackChainURL = "https://localhost:44364/api/BackwardChaining";
  static getForwardChainURL = "https://localhost:44364/api/ForwardChaining";

}
