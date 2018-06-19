using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CatsWeb.Controllers
{
    [Route("api/[controller]")]
    public class CatsController : Controller
    {
        private static string[] Names = new[]
        {
            "Sleepy Cat", "Grumpy Cat", "Dopey Cat", "Cool Kat", "Black Cat", "Fancy Cat"
        };
        private static int[] Ages = new[]
        {
            5,4,3,2,1,29
        };
        private static decimal[] Values = new []
        {
            25.00m,13.00m,75.00m,25.00m,25.00m,32000.00m
        };

        [HttpGet("[action]")]
        public IEnumerable<Cat> Cats()
        {
            return Enumerable.Range(0, Names.Length).Select(index => new Cat
            {
                Date = DateTime.Now.AddDays(index).ToString("d"),
                Name = Names[index],
                Age = Ages[index]//,
                //Value = Values[index]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<CatValue> CatValues()
        {
            return Enumerable.Range(0, Names.Length).Select(index => new CatValue
            {
                Name = Names[index],
                Value = Values[index]
            });
        }
        public class Cat
        {
            public string Date { get; set; }
            public int Age { get; set; }
            public string Name { get; set; }
           // public decimal Value { get; set; }
        }
        public class CatValue
        {
            public string Name { get; set; }
            public decimal Value { get; set; }
        }
    }
}
