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
            //if (_currentUser.SpelToken == null)
            //{
                return View(_context.Spellen.ToList());
            //}
            //else{
            //    return RedirectToAction(nameof(Game));
            //}
            
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
            _currentUser.Kleur = Kleur.Zwart;
            _currentUser.SpelToken = token;
            _identityContext.SaveChanges();
            return RedirectToAction(nameof(Game));
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
