using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieTitles.Entities
{
    public class Title
    {
        public int TitleId { get; set; }
        public string TitleName { get; set; }
        public string TitleNameSortable { get; set; }
        public int ReleaseYear { get; set; }
        public DateTime ProcessedDateTimeUTC { get; set; }
    }

    public class TitleDetail
    {
        public Title Title { get; set; }
        public IEnumerable<StoryLine> StoryLines { get; set; }
    }

    public class StoryLine
    {
        public int Id { get; set; }
        public int TitleId { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
    }
}
