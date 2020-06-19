using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Models;

namespace Domain.Algorithms
{
    public class BackwardChaining
    {
        private ClientInput clientInput;
        public Response response { get; private set; }

        private List<string> goals = new List<string>();
        private List<string> derivedFacts = new List<string>();
        private List<string> productions = new List<string>();
        public BackwardChaining(ClientInput _clientInput)
        {
            this.clientInput = _clientInput;
            response = new Response();
            response.information = _clientInput;

            bool state = BackwardChainingAlgorithm(clientInput.goal, 0);

            if (state)
            {
                response.result.status = "Achieved";
                foreach (string i in productions)
                {
                    response.result.Kelias.Add(i);
                }
            }
            else
            {
                response.result.status = "Unreachable";
            }
        }

        private bool BackwardChainingAlgorithm(string goal, int depth)
        {
            if (!goals.Contains(goal))
            {
                if (clientInput.facts.Contains(goal))
                {
                    response.protocol.Add(new Protocol()
                    {
                        goal = goal,
                        information = "Fact (Given)"
                    });
                    return true;
                }
                else if (derivedFacts.Contains(goal))
                {
                    response.protocol.Add(new Protocol()
                    {
                        goal = goal,
                        information = "Fact (Derived)"
                    });
                    return true;
                }
                else
                {
                    goals.Add(goal);
                    foreach (Rule rule in clientInput.rules)
                    {
                        if (rule.LeftSide.ToString().Equals(goal))
                        {
                            response.protocol.Add(new Protocol()
                            {
                                goal = goal,
                                information = "Getting " + rule.RuleNo +
                                ": " + rule.RuleNo + ": "
                              + string.Join(", ", rule.RightSide.ToList())
                              + " -> " + rule.LeftSide,
                                newGoals = string.Join(", ", rule.RightSide.ToList())
                            });

                            bool usable = true;
                            List<string> temp_derived_facts = new List<string>();
                            List<string> temp_productions = new List<string>();
                            temp_derived_facts.AddRange(derivedFacts);
                            temp_productions.AddRange(productions);
                            foreach (char fact in rule.RightSide)
                            {
                                if (!BackwardChainingAlgorithm(fact.ToString(), depth + 1))
                                {
                                    usable = false;
                                    derivedFacts = temp_derived_facts;
                                    productions = temp_productions;
                                    break;
                                }
                            }
                            if (usable)
                            {
                                derivedFacts.Add(rule.LeftSide.ToString());
                                productions.Add(rule.RuleNo.ToString());
                                string gdb = "";
                                gdb += string.Join(", ", clientInput.facts.ToList());
                                gdb += "; ";
                                gdb += string.Join(", ", derivedFacts);
                                response.protocol.Add(new Protocol()
                                {
                                    goal = goal,
                                    information = "Fact (now) and GDB = {" + gdb + "}."
                                }); ;
                                goals.Remove(goal);
                                return true;
                            }
                        }
                    }

                    response.protocol.Add(new Protocol()
                    {
                        goal = goal,
                        information = "FAIL, there is no more rules."
                    });
                    goals.Remove(goal);
                    return false;
                }
            }
            else
            {
                response.protocol.Add(new Protocol()
                {
                    goal = goal,
                    information = "FAIL - loop."
                });
                return false;
            }
        }
    }
}
