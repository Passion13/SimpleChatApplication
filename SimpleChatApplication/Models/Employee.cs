using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatApplication.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsOnline { get; set; }
        public string ConnectionId { get; set; }
        [NotMapped]
        public int Count { get; set; }
    }
}
