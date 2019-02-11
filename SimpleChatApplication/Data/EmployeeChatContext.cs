using Microsoft.EntityFrameworkCore;
using SimpleChatApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChatApplication.Data
{
    public class EmployeeChatContext :DbContext
    {
        public EmployeeChatContext(DbContextOptions<EmployeeChatContext> options):base(options) {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeMessage> EmployeeMessages { get; set; }
    }
}
