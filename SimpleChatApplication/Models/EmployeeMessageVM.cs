using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatApplication.Models
{
    public class EmployeeMessageVM
    {
        public string SenderName { get; set; }
        public int EmployeeId { get; set; }
        public string ReceiverName { get; set; }
        public string Message { get; set; }
        public string ConnectionId { get; set; }
        public int EmployeeMessageId { get; set; }
        public bool IsRead { get; set; }
        public string CreatedDate { get; set; }

    }

}
