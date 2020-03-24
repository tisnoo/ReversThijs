using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiApp.Models
{
    public class Users : IdentityUser
    {
        public Kleur? Kleur { get; set; }
        
        public string? SpelToken { get; set; }
    }
}
