using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Dashboard>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Dashboard>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Dashboard>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Dashboard>>.Success(await _context.Board.ToListAsync());
            }
        }
    }
}