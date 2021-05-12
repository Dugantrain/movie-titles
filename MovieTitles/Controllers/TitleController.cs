using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieTitles.Entities;
using MovieTitles.Repositories;

namespace MovieTitles.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TitleController : ControllerBase
    {
        private readonly ITitleRepository _titleRepository;

        public TitleController(ITitleRepository titleRepository)
        {
            _titleRepository = titleRepository;
        }

        [HttpGet]
        [Route("search/{searchText}")]
        public IEnumerable<Title> Search(string searchText)
        {
            return _titleRepository.GetTitlesBySearchText(searchText);
        }

        [HttpGet]
        [Route("{id}")]
        public Title GetById(int id)
        {
            return _titleRepository.GetById(id);
        }
    }
}
