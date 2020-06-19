using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using Domain.Algorithms;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForwardChainingController : ControllerBase
    {
        private Response res;
        // POST: api/ForwardChaining
        [HttpPost]
        public IActionResult Post(ClientInput clientInput)
        {

            ForwardChaining algorithm = new ForwardChaining(clientInput);

            res = algorithm.response;
            if (res.result.status == "achieved")
            {
                try
                { 
                    GetPassAllURLAsync();
                    return Ok(JsonConvert.SerializeObject(res));
                }
                catch (Exception ex)
                {
                    return Ok(JsonConvert.SerializeObject(res));
                }
            }
            else
            {
                return Ok(JsonConvert.SerializeObject(res));

            }
        }
        private void GetPassAllURLAsync()
        {
            var body = new Input();
            foreach (var path in res.result.Kelias)
            {
                int b = Convert.ToInt16(path);
                var parameters = res.information.rules[b - 1].RightSide;
                for (int i = 0; i < parameters.Length; i++)
                {
                    var s = res.information.factsValues.Where(r => r.fact == parameters[i].ToString());
                    if (s.Any())
                    {
                        if (s.First().type == "String")
                        {
                            body.parameters.Add(s.First().factValue);
                        }
                        else
                        {
                            var typ = s.First().type;
                            var se = s.First().factValue;
                            body.times = Convert.ToInt32(s.First().factValue);
                        }
                    }
                    else
                    {
                        throw new Exception();
                    }
                }
                try
                {
                    var response = CallAnAPI(body, res.information.rules[b - 1].RuleURL);
                    var responseContent = response.Content;
                    string responseString = responseContent.ReadAsStringAsync().Result;
                    res.information.factsValues.Add(new Fact { fact = res.information.rules[b - 1].LeftSide.ToString(), type = "String", factValue = responseString });
                    body = new Input();
                }
                catch (Exception ex)
                {
                    var s = ex.Message;
                }
            }
        }

        private HttpResponseMessage CallAnAPI(Input data, string uri)
        {
            using (var client = new HttpClient())
            {
                var jsonString = JsonConvert.SerializeObject(data);
                var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

                client.BaseAddress = new Uri(uri);
                var response = client.PostAsync("", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    Console.Write("Success");
                    return response;
                }
                else
                    Console.Write("Error");
                return null;
            }
        }
    }

}
