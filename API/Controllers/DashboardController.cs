using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DashboardController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Dashboard>>> GetDashBoard()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Dashboard>> GetDashboardOne(Guid id)
        {
           return await Mediator.Send(new Details.Query{Id=id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Dashboard dashboard)
        {
            return Ok(await Mediator.Send(new Create.Command {Dashboard = dashboard}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Dashboard dashboard)
        {
            dashboard.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Dashboard = dashboard}));
        }

    }
}