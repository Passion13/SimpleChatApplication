using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatApplication.Hubs
{
    public class ChatHub : Hub
    {
        
        private static ConcurrentDictionary<string, string> clients = new ConcurrentDictionary<string, string>();
        
        public void Login(string username)
        {
            var temp = clients.Where(x => x.Value == username).Select(x => x.Value).FirstOrDefault();
            if (string.IsNullOrWhiteSpace(temp))
            {
                clients.TryAdd(Context.ConnectionId, username);
            }
            //return Clients.Client(Context.ConnectionId).SendAsync("GetLogin", username);
        }
        public bool IsOnline(string userName)
        {
            return clients.Where(x => x.Value == userName).Select(x => x.Value).FirstOrDefault() != null ?
                true : false;
        }

        public Task GetAllActiveConnections()
        {
            try
            {
                var list = clients.Where(x => x.Key != Context.ConnectionId).Select(x => x.Value).ToList();
                return Clients.Client(Context.ConnectionId).SendAsync(
                    "NewOnlineUser",
                     list
                    );
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Task SendPrivateMessage(string userName, string message, string loginUser)
        {
            var list = clients.Where(x => x.Value == userName || x.Value == loginUser).Select(x => x.Key).ToList();

            return Clients.Clients(list).SendAsync("ReceiveMessage", userName, message,DateTime.Now.ToShortTimeString(),loginUser);
            // return Clients.All.SendAsync("ReceiveMessage", userName, message, DateTime.Now.Date.ToString("MM/dd/yyyy")); 
        }
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
        private static int Count = 0;
        public override Task OnConnectedAsync()
        {
            Count++;
            base.OnConnectedAsync();
            Clients.All.SendAsync("GetLogin", Context.ConnectionId);
            return Task.CompletedTask;
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            Count--;
            base.OnDisconnectedAsync(exception);
         //   Clients.All.SendAsync("updateCount", Count);
           // clients = new ConcurrentDictionary<string, string>();

            
            return Task.CompletedTask;
        }
    }

}

