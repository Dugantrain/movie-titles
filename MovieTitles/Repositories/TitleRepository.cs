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
        TitleDetail GetById(int id);
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
            if (string.IsNullOrEmpty(searchText)) return _applicationDbContext.Title.OrderBy(t=> t.TitleNameSortable);
            var titles = _applicationDbContext.Title.Where(t => t.TitleName.Contains(searchText)).OrderBy(t => t.TitleNameSortable);
            return titles;
        }

        public TitleDetail GetById(int id)
        {
            var title = _applicationDbContext.Title.SingleOrDefault(t => t.TitleId == id);
            var storyLines = _applicationDbContext.StoryLine.Where(s => s.TitleId == id);
            return new TitleDetail
            {
                Title = title,
                StoryLines = storyLines
            };
        }
    }
}
