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
        public async Task<IActionResult> GetDashBoard()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDashboardOne(Guid id)
        {
           var result = await Mediator.Send(new Details.Query{Id=id});

           return HandleResult(result);
          
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Dashboard dashboard)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Dashboard = dashboard}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Dashboard dashboard)
        {
            dashboard.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Dashboard = dashboard}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}