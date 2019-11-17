using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace KursyTutoriale.Infrastructure.Configuration
{
    /// <summary>
    /// For design time migrations only
    /// </summary>
    class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();

            var options = builder.UseSqlServer("Server=.;Database=KursyTutoriale;Trusted_Connection=True").Options;

            var context = new ApplicationDbContext(options);

            return context;
        }
    }
}
