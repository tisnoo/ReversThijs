using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiApp.Hubs
{
    public class ReversiHub : Hub
    {
        public async Task SendMessage(string update)
        {
            await Clients.All.SendAsync("update", update);
        }
    }
}
