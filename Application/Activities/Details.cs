using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Dashboard>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Dashboard>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Dashboard> Handle(Query request, CancellationToken cancellationToken)
            {
               var activity = await _context.Board.FindAsync(request.Id);
               if(activity == null) throw new Exception("Activity Not Found");
               return activity;
            }
        }
    }
}