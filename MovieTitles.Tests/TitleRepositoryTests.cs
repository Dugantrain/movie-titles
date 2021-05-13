using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Moq;
using MovieTitles.Entities;
using MovieTitles.Repositories;
using Objectivity.AutoFixture.XUnit2.AutoMoq.Attributes;
using Xunit;

namespace MovieTitles.Tests
{
    public class TitleRepositoryTests
    {
        [Theory, AutoMockData]
        public void TitlesShouldBeSortedAlphaNumeric(List<Title> mockTitles)
        {
            mockTitles.Add(new Title
            {
                TitleName = "1",
                TitleNameSortable = "1"
            });
            var mockTitleSet = mockTitles.AsDbSetMock();

            var mockApplicationDbContextFixture = new Mock<IApplicationDbContext>();
            mockApplicationDbContextFixture.Setup(a => a.Title).Returns(mockTitleSet.Object);
            var sut = new TitleRepository(mockApplicationDbContextFixture.Object);
            var titles = sut.GetTitlesBySearchText(string.Empty);
            Assert.True(titles.First().TitleName == "1");

        }
    }

    public static class MockDbSetExtensions
    {
        public static Mock<DbSet<T>> AsDbSetMock<T>(this IEnumerable<T> list) where T : class
        {
            var queryableList = list.AsQueryable();
            var dbSetMock = new Mock<DbSet<T>>();
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Provider).Returns(queryableList.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Expression).Returns(queryableList.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.ElementType).Returns(queryableList.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.GetEnumerator()).Returns(() => queryableList.GetEnumerator());
            return dbSetMock;
        }
    }
}
