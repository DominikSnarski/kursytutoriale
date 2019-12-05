using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KursyTutoriale.Application
{
    public interface IDTOMapper : IMapper
    {
        IQueryable<Target> MapQueryable<Target, Source>(IQueryable<Source> source);
    }
    public class DTOMapper : Mapper, IDTOMapper
    {
        public DTOMapper(IConfigurationProvider configurationProvider) : base(configurationProvider)
        {
        }

        public IQueryable<Target> MapQueryable<Target, Source>(IQueryable<Source> source) {
            List<Target> list = new List<Target>();
            foreach(Source item in source)
                list.Add(Map<Target>(item));
            return list.AsQueryable();
        }
    }
}
