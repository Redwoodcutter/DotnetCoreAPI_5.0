using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Dashboard>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Dashboard>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Dashboard>> Handle(Query request, CancellationToken cancellationToken)
            {
               var activity = await _context.Board.FindAsync(request.Id);
               
               return Result<Dashboard>.Success(activity);
            }
        }
    }
}