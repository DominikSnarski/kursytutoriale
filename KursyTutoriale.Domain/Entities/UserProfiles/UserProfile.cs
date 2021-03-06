﻿using System;

namespace KursyTutoriale.Domain.Entities.UserProfiles
{
    public class UserProfile : BaseEntity
    {
        public UserProfile() :base() { }
        public UserProfile(Guid id):base(id){
        }

        public string Username { get; set; }
        public string Name { get; set; }
        public string SiteLink { get; set; }
        public string AvatarPath { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string ProfileDescription { get; set; }
    }
}
