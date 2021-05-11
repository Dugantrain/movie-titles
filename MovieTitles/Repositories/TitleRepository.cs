using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MovieTitles.Entities;

namespace MovieTitles.Repositories
{
    public interface ITitleRepository
    {
        IEnumerable<Title> GetTitlesBySearchText(string searchText);
    }
    public class TitleRepository : ITitleRepository
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public TitleRepository(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public IEnumerable<Title> GetTitlesBySearchText(string searchText)
        {
            var titles = _applicationDbContext.Title.Where(t => t.TitleName.Contains(searchText));
            return titles;
        }
    }
}
