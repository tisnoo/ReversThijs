using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReversiApp.DAL;
using ReversiApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    public class ReversiController : Controller
    {


        private readonly Spel _context;
        private readonly SpelerContext context;


        public ReversiController(SpelerContext context)
        {
            //Vervangen door token
            _context = context.Spellen.ToList()[0];
            this.context = context;
        }

        [HttpGet("{x}/{y}")]
        [Route("api/reversi/checkPiece")]
        public bool CheckPiece(int x, int y)
        {

            if (_context.BordJson != null)
            {
                _context.Bord = JsonConvert.DeserializeObject<Kleur[,]>(_context.BordJson);
                return _context.ZetMogelijk(x,y);
            }
            else
            {
                return false;
            }
        }

        [HttpGet("{x}/{y}")]
        [Route("api/reversi/placePiece")]
        public bool placePiece(int x, int y)
        {

            if (_context.BordJson != null)
            {
                _context.Bord = JsonConvert.DeserializeObject<Kleur[,]>(_context.BordJson);
                bool returnBool = _context.DoeZet(x, y);

                _context.BordJson = JsonConvert.SerializeObject( _context.Bord);
                if (returnBool)
                {
                    context.SaveChanges();
                }
                return returnBool;
            }
            else
            {
                return false;
            }
        }



        [HttpGet]
        [Route("api/reversi/init")]
        public void Init()
        {
            Spel temp = new Spel();

            if (_context.BordJson == null)
            {
                _context.BordJson = JsonConvert.SerializeObject(temp.Bord);
                context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("api/reversi/getscore")]
        public string GetScore()
        {
            Spel temp = new Spel();

            _context.Bord = JsonConvert.DeserializeObject<Kleur[,]>(_context.BordJson);
            return JsonConvert.SerializeObject(_context.score());

        }

        [HttpGet]
        [Route("api/reversi/getboard")]
        public string GetBoard()
        {
            if (_context.BordJson != null)
            {
                return _context.BordJson;
            }
            else
            {
                return "error 41";
            }
        }


        [HttpGet]
        [Route("api/reversi/aanzet")]
        public string Aanzet()
        {
            string aanzet =  _context.AandeBeurt.ToString();
            GeeftBeurtDoor();


            return aanzet;
        }

        // GET: api/<controller>
        [Route("api/reversi")]
        public IEnumerable<string> Get()
        {
            return new string[] {_context.Bord.ToString()};
        }




        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        //Update the player
        [HttpPut]
        public void GeeftBeurtDoor()
        {
            _context.Pas();
            context.SaveChanges();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}