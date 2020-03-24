using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReversiApp.DAL;
using ReversiApp.Data;
using ReversiApp.Models;

namespace ReversiApp.Controllers
{
    [Authorize]
    public class SpelerController : Controller
    {
        private readonly UserManager<Users> _userManager;

        public SpelerController(UserManager<Users> userManager)
        {
            this._userManager = userManager;
        }

        // GET: Speler
        public ActionResult Index()
        {
            var users = _userManager.Users;
            return View(users);
        }
    }
}