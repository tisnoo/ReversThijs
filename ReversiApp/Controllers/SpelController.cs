using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }



            var speler = await _context.Spellen.FirstOrDefaultAsync(m => m.ID == id);
            if (speler == null)
            {
                return NotFound();
            }



            return View(speler);
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

        [Authorize(Roles = "Administrator")]
        // GET: Spelers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }



            var speler = await _context.Spellen.FindAsync(id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }



        // POST: Spelers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Naam,Wachtwoord,Token,Kleur")] Spel speler)
        {
            if (id != speler.ID)
            {
                return NotFound();
            }



            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(speler);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SpelerExists(speler.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }



        [Authorize(Roles = "Administrator")]
        // GET: Spelers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }



            var speler = await _context.Spellen
                .FirstOrDefaultAsync(m => m.ID == id);
            if (speler == null)
            {
                return NotFound();
            }



            return View(speler);
        }



        // POST: Spelers/Delete/5
        [Authorize(Roles = "Administrator")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var speler = await _context.Spellen.FindAsync(id);
            _context.Spellen.Remove(speler);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }



        private bool SpelerExists(int id)
        {
            return _context.Spellen.Any(e => e.ID == id);
        }
    }
}