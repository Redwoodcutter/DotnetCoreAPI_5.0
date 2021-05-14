using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DashboardController : BaseApiController
    {
        private readonly DataContext _context;
        public DashboardController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Dashboard>>> GetDashBoard()
        {
            return await _context.Board.ToListAsync();
        }
        [HttpGet("{id}")] 
        public async Task<ActionResult<Dashboard>> GetDashboardOne(Guid id)
        {
            return await _context.Board.FindAsync(id);
        }

    }
}