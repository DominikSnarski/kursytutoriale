using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application
{
    public interface IDTOMapper : IMapper
    {
    }
    public class DTOMapper : Mapper, IDTOMapper
    {
        public DTOMapper(IConfigurationProvider configurationProvider) : base(configurationProvider)
        {
        }
    }
}
