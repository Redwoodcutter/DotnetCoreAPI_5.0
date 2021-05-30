using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Dashboard Dashboard { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               var activities = await _context.Board.FindAsync(request.Dashboard.Id);

               activities.Title = request.Dashboard.Title ?? activities.Title;

               await _context.SaveChangesAsync();

               return Unit.Value;

            }
        }
    }
}