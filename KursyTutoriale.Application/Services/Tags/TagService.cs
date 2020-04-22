using KursyTutoriale.Application.DataTransferObjects.Tags;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services.Tags
{
    class TagService : ITagService
    {
        IExtendedRepository<Tag> repository;
        IDTOMapper mapper;

        public TagService(IExtendedRepository<Tag> repository, IDTOMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public ICollection<TagDTO> GetAllTags()
        {
            var tagsCollection = repository.Queryable().ToList();

            return mapper.Map<List<TagDTO>>(tagsCollection);
        }
    }
}
