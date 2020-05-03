using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface ICourseAuthorService
    {
        List<UserProfileDTO> GetMostPopularAuthors(int count);
    }
}