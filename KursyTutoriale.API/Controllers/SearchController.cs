﻿using System;
using System.Collections.Generic;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        ISearchService searchService;
        public SearchController(ISearchService searchService)
        {
            this.searchService = searchService;
        }

        /// <summary>
        /// return the best results for a courses that match the phrase, ordered from best to worse
        /// </summary>
        /// <param name="phrase">the phrase that will be used to search for courses</param>
        /// <param name="totalNumberOfResults">the maximum number of results to be returned</param>
        /// <returns>and object containing the list of items</returns>
        [HttpGet("GetCourseSearch")]
        public IEnumerable<CoursePageItemDTO> GetCourseSearch(string phrase)
        {
            return searchService.Search(phrase);
        }
    }
}