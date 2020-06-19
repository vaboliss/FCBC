using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Models;

namespace Domain.Algorithms
{
   

    public class ForwardChaining
    {
        private ClientInput clientInput;
        public Response response { get; private set; }

        public Queue<string> root = new Queue<string>();
        public List<Rule> usedRules = new List<Rule>();

        public int ruleNumbering = 0;
        public bool state;
        public string doesntHave;

        public ForwardChaining(ClientInput _clientInput)
        {
            this.clientInput = _clientInput;
            response = new Response
            {
                information = _clientInput
            };

            if (clientInput.facts.Contains(clientInput.goal))
            {
                response.result.status = "achieved";
                response.protocol.Add(new Protocol()
                {
                    goal = clientInput.goal,
                    information = "Goal is among current facts"
                });
            }
            else
            {
                state = ForwardChainingAlgorithm();
                if (state)
                {
                    response.result.status = "achieved";
                    foreach (string item in root)
                    {
                        response.result.Kelias.Add(item);
                    }
                }
                else
                {
                    response.result.status = "Can't achieve ";
                    response.result.Kelias.Add("Goal is unreachable");

                }
            }
        }

        private bool ForwardChainingAlgorithm()
        {
            string GDB = "";
            foreach (char fact in clientInput.facts)
            {
                GDB += fact;
            }
            bool halt;
            int index = 0;

            while (true)
            {
                if (GDB.Contains(clientInput.goal))
                {
                    return true;
                }
                halt = true;
                Protocol temp = new Protocol();
                temp.information += ++ruleNumbering + " iteration \n\n";

                index = 0;
                foreach (Rule r in clientInput.rules)
                {
                    index++;
                    if (GDB.Contains(clientInput.goal))
                    {
                        return true;
                    }
                    else
                    {
                        if (r.Flag2 == true)
                        {
                            temp.information += "   " + index + ") " + r.RuleNo + " (" + string.Join(", ", r.RightSide.ToList()) + " -> " + r.LeftSide
                                                    + ") can't apply, because of flag2.\n";
                        }
                        else
                        {
                            if (r.Flag1 == true)
                            {
                                temp.information += "   " + index + ") " + r.RuleNo + " (" + string.Join(", ", r.RightSide.ToList()) + " -> " + r.LeftSide
                                                        + ") can't apply, because of flag1.\n";
                            }
                            else
                            {
                                if (GDB.Contains(r.LeftSide))
                                {
                                    r.Flag2 = true;
                                    temp.information += "   " + index + ") " + r.RuleNo + " (" + string.Join(", ", r.RightSide.ToList()) + " -> " + r.LeftSide
                                                        + ") can't apply, because result is in the current facts. Raising flag2.\n";
                                }
                                else
                                {
                                    if (IsInRuleRightSide(r.RightSide, GDB))
                                    {
                                        usedRules.Add(r);
                                        halt = !halt;
                                        GDB += r.LeftSide;
                                        r.Flag1 = true;
                                        temp.information += "   " + index + ") " + r.RuleNo + " (" + string.Join(", ", r.RightSide.ToList()) + " -> " + r.LeftSide
                                                        + ") applying, raising flag1. Facts: {" + string.Join(", ", GDB.ToList()) + "}.\n\n";
                                        root.Enqueue("" + r.RuleNo);
                                        break;
                                    }
                                    else
                                    {

                                        foreach (char c in r.RightSide)
                                        {
                                            if (!GDB.Contains(c))
                                            {
                                                doesntHave += c;
                                            }
                                        }
                                        temp.information += "   " + index + ") " + r.RuleNo + " (" + string.Join(", ", r.RightSide.ToList()) + " -> " + r.LeftSide
                                                        + ") can't apply, missing " + string.Join(", ", doesntHave.ToList()) + ".\n";
                                        doesntHave = "";
                                    }
                                }
                            }
                        }
                    }
                }

                if (halt)
                {
                    temp.information += "\n";
                    return false;
                }
                temp.goal = clientInput.goal;
                response.protocol.Add(temp);
            }
        }
        private bool IsInRuleRightSide(string s, string GDB)
        {
            int cnt = 0;

            foreach (char c in s)
            {
                if (GDB.Contains(c))
                {
                    cnt++;
                }
            }

            if (cnt == s.Length)
                return true;
            else
                return false;
        }
    }
    }

