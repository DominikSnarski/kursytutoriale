using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.CoursePublication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface IPublicationService
    {
        void AddPromotionCode(Guid courseId, DiscountConfigDto config);
        List<DiscountCodeDto> GetCourseDiscountCodes(Guid courseId);
        int GetPriceWithDiscountCode(Guid courseId, string code);
        void InvalidateCode(Guid courseId, string code);
        CourseVersion PublishCourse(Guid courseId);
        CourseVersion PublishNewVersion(Guid courseId, bool isMajor);
    }
}