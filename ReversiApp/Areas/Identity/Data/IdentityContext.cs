using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReversiApp.Models;

namespace ReversiApp.Data
{
    public class IdentityContext : IdentityDbContext<Users>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options)
            : base(options)
        {
        }
        public DbSet<Users> Spelers { get; set; }
        
        public IdentityContext() { }
    }
}
