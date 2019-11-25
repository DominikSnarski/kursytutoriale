﻿using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KursyTutoriale.Application.Services
{
    public interface IUserListService
    {
        public IQueryable<UserBasicInformationDTO> GetUserList();
        public int GetNumberOfUsers();
    }
    public class UserListService : IUserListService
    {
        IDTOMapper mapper;
        IUserProfileRepository userProfileRepository;
        public UserListService(IDTOMapper mapper,
                                  IUserProfileRepository userProfileRepository)
        {
            this.mapper = mapper;
            this.userProfileRepository = userProfileRepository;
        }

        public int GetNumberOfUsers() => userProfileRepository.Queryable().Count();

        public IQueryable<UserBasicInformationDTO> GetUserList()
        {
            List<UserBasicInformationDTO> userList = new List<UserBasicInformationDTO>();
            IQueryable<UserProfile> repositoryList = userProfileRepository.Queryable();
            foreach (UserProfile userProfile in repositoryList)
                userList.Add(mapper.Map<UserBasicInformationDTO>(userProfile));
            return userList.AsQueryable<UserBasicInformationDTO>();
        }
    }
}
