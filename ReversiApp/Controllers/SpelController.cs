using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReversiApp.DAL;
using ReversiApp.Models;

namespace ReversiApp.Controllers
{
    [Authorize]
    public class SpelController : Controller
    {
        private readonly SpelerContext _context;


        public SpelController(SpelerContext context)
        {
            _context = context;
        }

        // GET: Spel
        public ActionResult Index()
        {
            return View(_context.Spellen.ToList());
        }

        // GET: Spel/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Spel/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Speler/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Spel _speler)
        {
            if (ModelState.IsValid)
            {

                _context.Add(_speler);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }

            return View(_speler);
        }

        // GET: Spel/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Spel/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Spel/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Spel/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}