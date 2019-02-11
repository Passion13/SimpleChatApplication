using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleChatApplication.Data;
using SimpleChatApplication.Models;

namespace SimpleChatApplication.Controllers
{

    public class EmployeeController : Controller
    {
        private readonly EmployeeChatContext _context;

        public EmployeeController(EmployeeChatContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("api/Employee/Login")]
        public Employee Login([FromBody]Employee employee)
        {
            try
            {

                var employeeDetail = _context.Employees.Where(x => x.Username == employee.Username && x.Password == employee.Password).FirstOrDefault();
                if (employeeDetail != null)
                {
                    employeeDetail.ConnectionId = employee.ConnectionId;
                    _context.Entry(employeeDetail).Property("ConnectionId").IsModified = true;
                    _context.SaveChanges();
                }


                return employeeDetail;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpPost]
        [Route("api/Employee/Logout")]
        public void Logout(int id = 0)
        {
            var employee = _context.Employees.Where(x => x.EmployeeId == id).FirstOrDefault();
            if (employee != null)
            {
                employee.ConnectionId = null;
                _context.Entry(employee).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }
        [HttpPost]
        [Route("api/Employee/SaveMessage")]
        public bool SaveMessage([FromBody]EmployeeMessage employeeMessage)
        {
            try
            {

                employeeMessage.CreatedDate = DateTime.Now;

                _context.Add(employeeMessage);
                int ok = _context.SaveChanges();

                return ok > 0 ? true : false;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Route("api/Employee/Index/{id}")]
        public IEnumerable<Employee> Index(int id = 0)
        {
            try
            {
                var employeeList =  _context.Employees.Where(x => x.EmployeeId != id)
                    .Select(x=>new Employee {
                        EmployeeId=x.EmployeeId,
                        IsOnline=x.ConnectionId!=null?true:false,
                        Username=x.Username,
                        Count= (from c in _context.EmployeeMessages
                                where c.SenderId==x.EmployeeId && c.ReceiverId==id && c.IsRead==false
                                select c).Count(),
                       
                    }).ToList();
                return employeeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet]
        [Route("api/Employee/Message")]
        public IEnumerable<EmployeeMessageVM> Message(int senderId = 0, int receiverId = 0)
        {
            try
            {
                var employeeMessage = (from e in _context.EmployeeMessages
                                       where (e.SenderId == senderId && e.ReceiverId == receiverId) ||
                                       (e.ReceiverId == senderId && e.SenderId == receiverId)
                                       select e);
                var UnReadMessages = employeeMessage.Where(x => x.IsRead == false).ToList();
                foreach (var message in UnReadMessages)
                {
                    message.IsRead = true;
                    _context.Entry(message).State = EntityState.Modified;
                }
                _context.SaveChanges();
                //int senderId = (from em in _context.Employees where em.Username == senderName select em.EmployeeId).FirstOrDefault();
                //int receverId = (from em in _context.Employees where em.Username == receiverName select em.EmployeeId).FirstOrDefault();
                var messageHistory = (from e in employeeMessage
                                      select new EmployeeMessageVM()
                                      {
                                          SenderName = (from em in _context.Employees where em.EmployeeId == e.SenderId select em.Username).FirstOrDefault(),
                                          ReceiverName = (from emm in _context.Employees where emm.EmployeeId == e.ReceiverId select emm.Username).FirstOrDefault(),
                                          Message = e.Message,
                                          EmployeeMessageId = e.EmployeeMessageId,
                                          IsRead = e.IsRead,
                                          CreatedDate = e.CreatedDate.ToShortTimeString()
                                      }).ToList();

                return messageHistory;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}