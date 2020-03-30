using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReversiApp.DAL;
using ReversiApp.Data;
using ReversiApp.Models;

namespace ReversiApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly SpelerContext _context;
        private readonly IdentityContext _identityContext;
        private readonly UserManager<Users> _userManager;
        private readonly Users _currentUser;
        private IHttpContextAccessor _contextAccessor;
        private HttpContext _httpContext { get { return _contextAccessor.HttpContext; } }


        public HomeController(UserManager<Users> um, SpelerContext c, IdentityContext ic, IHttpContextAccessor contextAccessor)
        {

            _contextAccessor = contextAccessor;
            _context = c;
            _identityContext = ic;
            _userManager = um;
            _currentUser = _userManager.GetUserAsync(_httpContext.User).Result;
        }


        public IActionResult Index()
        {
            if (_currentUser.SpelToken == null)
            {
                List<Spel> _beschikbareSpellen = new List<Spel>();

                foreach (var spel in _context.Spellen.ToList())
                {
                    int spelers = 0;
                    foreach (var speler in _identityContext.Users.ToList())
                    {
                        if (speler.SpelToken != null)
                        {
                            if (spel.Token == speler.SpelToken)
                            {
                                spelers++;
                            }
                        }
                    }
                    if (spelers == 1)
                    {
                        _beschikbareSpellen.Add(spel);
                    }
                }

                return View(_beschikbareSpellen);
            }
            else{
                return RedirectToAction(nameof(Game));
            }
            
        }
        // GET: Spel/Create
        public ActionResult Create()
        {
            return View();
        }

        public IActionResult Game()
        {
            return View();
        }


        public ActionResult Join(string token)
        {
           

            Spel _spel = _context.Spellen.FirstOrDefault(x => x.Token == token);

            int spelUsers = 0;
            Kleur spelerKleur = Kleur.Geen;

            foreach (var speler in _identityContext.Users.ToList())
            {
                if (speler.SpelToken == _spel.Token)
                {
                    spelUsers++;
                    spelerKleur = speler.Kleur.Value; 
                }
            }

            if (spelUsers == 1)
            {
                if (spelerKleur == Kleur.Wit)
                {
                    _currentUser.Kleur = Kleur.Zwart;
                }
                else
                {
                    _currentUser.Kleur = Kleur.Wit;
                }
                _currentUser.SpelToken = token;
                _identityContext.SaveChanges();
                return RedirectToAction(nameof(Game));
            }
            else
            {
                return RedirectToAction(nameof(Index));
            }
        }

        public ActionResult backToList()
        {

            return RedirectToAction(nameof(Index));
        }


        private string randomToken()
        {
            StringBuilder str_build = new StringBuilder();
            Random random = new Random();

            char letter;
            //Add token
            for (int i = 0; i < 5; i++)
            {
                double flt = random.NextDouble();
                int shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                str_build.Append(letter);
            }

            return str_build.ToString();

        }

        // POST: Speler/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Spel _speler)
        {
            if (ModelState.IsValid)
            {
                //Set the random token
                _speler.Token = randomToken();
                _currentUser.SpelToken = _speler.Token;
                //Set the board
                Spel x = new Spel();

                _speler.BordJson = JsonConvert.SerializeObject(x.Bord);
                _speler.AandeBeurt = Kleur.Wit;
                _currentUser.Kleur = Kleur.Wit;

                _context.Add(_speler);
                _context.SaveChanges();
                _identityContext.SaveChanges();
                return RedirectToAction(nameof(Game));
            }

            return View(_speler);
        }

    }
}
