using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReversiApp.DAL;
using ReversiApp.Data;
using ReversiApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    public class ReversiController : Controller
    {


        private readonly Spel _context;
        private readonly SpelerContext context;
        private readonly IdentityContext identityContext;
        private readonly UserManager<Users> _userManager;
        private readonly Users _currentUser;
        private IHttpContextAccessor _contextAccessor;
        private HttpContext _httpContext { get { return _contextAccessor.HttpContext; } }

        public ReversiController(SpelerContext context, IdentityContext idc, IHttpContextAccessor contextAccessor, UserManager<Users> um)
        {
            this.context = context;
            _contextAccessor = contextAccessor;
            _userManager = um;
            identityContext = idc;
            _currentUser = _userManager.GetUserAsync(_httpContext.User).Result;


            //Vervangen door token
            _context = context.Spellen.FirstOrDefault(x => x.Token == _currentUser.SpelToken);
        }



        [Route("api/reversi/IsWon")]
        public bool IsWon()
        {
            _context.Bord = JsonConvert.DeserializeObject<Kleur[,]>(_context.BordJson);

            if (_context.Afgelopen())
            {
                return true;
            }
            else
            {
                return false;
            }
        }



        [Route("api/reversi/playingColor")]
        public Kleur PlayingColor()
        {
            return _context.AandeBeurt;
        }
        [Route("api/reversi/playerColor")]
        public Kleur PlayerColor()
        {
            return _currentUser.Kleur.Value;
        }

        [Route("api/reversi/gameDescription")]
        public string GameDescription()
        {
            return _context.Omschrijving;
        }



        [Route("api/reversi/winningPlayer")]
        public string WinningPlayer()
        {
            Users playerWhite = identityContext.Users.FirstOrDefault(x => x.SpelToken == _context.Token && x.Kleur == Kleur.Wit);
            Users playerBlack = identityContext.Users.FirstOrDefault(x => x.SpelToken == _context.Token && x.Kleur == Kleur.Zwart);

            Kleur winningColor = _context.OverwegendeKleur();
            if (playerWhite != null && playerBlack != null)
            {
                if (winningColor == Kleur.Wit)
                {
                    return playerWhite.UserName;
                }
                else
                {
                    return playerBlack.UserName;
                }
            }
            return "Nog niet genoeg spelers";
        }



        [Route("api/reversi/leaveBoard")]
        public void LeaveBoard()
        {

            _currentUser.Kleur = Kleur.Geen;
            string roomtoken = _currentUser.SpelToken;
            _currentUser.SpelToken = null;

            bool playersStillInRoom = false;

            foreach(Users user in identityContext.Users.ToList())
            {
                if (user.SpelToken == roomtoken)
                {
                    playersStillInRoom = true;
                    break;
                }
            }

            if (!playersStillInRoom)
            {
                context.Remove(_context);
            }

            context.SaveChanges();
            identityContext.SaveChanges();
        }


        [HttpGet("{kleur}")]
        [Route("api/reversi/getPlayerName")]
        public string GetPlayerName(int kleur)
        {
            Users tempUser;

            if (kleur == 1)
            {
                tempUser = identityContext.Users.FirstOrDefault(x => x.SpelToken == _context.Token && x.Kleur.Value == Kleur.Wit);
            }
            else
            {
                tempUser = identityContext.Users.FirstOrDefault(x => x.SpelToken == _context.Token && x.Kleur.Value == Kleur.Zwart);
            }
            if (tempUser != null)
            {
                return tempUser.UserName;
            }
            else
            {
                return "Nog geen tweede speler";
            }
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

            _context.Bord = JsonConvert.DeserializeObject<Kleur[,]>(_context.BordJson);
            return JsonConvert.SerializeObject(_context.score());

        }

        [HttpGet]
        [Route("api/reversi/getscorehistory")]
        public string GetScoreHistory()
        {

            return _context.PuntenHistorieJson;

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