using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models
{
    public class ClientInput
    {
        public string goal { get; set; }
        public string facts { get; set; }
        public List<Fact> factsValues { get; set; }
        public List<Rule> rules { get; set; }
    }
}
