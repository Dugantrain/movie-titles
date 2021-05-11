using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.EntityFrameworkCore;
using MovieTitles.Entities;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace MovieTitles.Repositories
{
    public interface IApplicationDbContext
    {
        Microsoft.EntityFrameworkCore.DbSet<Title> Title { get; set; }
    }
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public Microsoft.EntityFrameworkCore.DbSet<Title> Title { get; set; }
    }
}