using KursyTutoriale.Application.DataTransferObjects.Tags;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Services.Tags
{
    public interface ITagService
    {
        ICollection<TagDTO> GetAllTags();
    }
}
