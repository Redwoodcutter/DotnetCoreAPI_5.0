using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Dashboard>> { }
        public class Handler : IRequestHandler<Query, List<Dashboard>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Dashboard>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Board.ToListAsync();
            }
        }
    }
}