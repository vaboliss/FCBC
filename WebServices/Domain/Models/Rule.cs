using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models
{
    public class Rule
    {
        public char LeftSide { get; set; }
        public string RightSide { get; set; }
        public int RuleNo { get; set; }
        public string RuleURL { get; set; }
        public bool Flag1 = false;
        public bool Flag2 = false;
        public Rule()
        {

        }
    }
}
