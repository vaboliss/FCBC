using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models
{
    public class Response
    {
        public ClientInput information;
        public List<Protocol> protocol = new List<Protocol>();
        public Result result = new Result();
    }
}
