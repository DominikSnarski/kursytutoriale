using KursyTutoriale.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class CoursePublicationProfile
    {
        private List<CourseVersion> versions;
        private List<Observer> observers;
        private List<Comment> comments;
        private List<CourseProgress> progresses;

        public Guid CourseId { get; private set; }
        public Guid OwnerId { get; private set; }
        public bool CommentsEnabled { get; private set; }
        public int Popularity { get; set; }
        public double Rating { get; set; }


        public IReadOnlyCollection<CourseVersion> Versions { get => versions.AsReadOnly(); }
        public IReadOnlyCollection<Observer> Observers { get => observers.AsReadOnly(); }
        public IReadOnlyCollection<Comment> Comments { get => CommentsEnabled ? comments.AsReadOnly() : new List<Comment>().AsReadOnly(); }
        public IReadOnlyCollection<CourseProgress> Progresses { get => progresses.AsReadOnly(); }


        public CoursePublicationProfile(Guid courseId, Guid ownerId)
        {
            CourseId = courseId;
            OwnerId = ownerId;

            versions = new List<CourseVersion>();
            versions.Add(new CourseVersion(1, 0, DateTime.Now));

            CommentsEnabled = true;

            observers = new List<Observer>();

            progresses = new List<CourseProgress>();
        }

        public CourseVersion PublishNewMajorVersion()
        {
            var currentTime = DateTime.Now;
            var latestVersion = GetLatestVersion();

            if (latestVersion.PublicationDate >= currentTime)
                throw new InvalidStateException("Cannot publish version before latest version");

            var newVersion = new CourseVersion(latestVersion.MajorVersionNumber + 1, 0, currentTime);
            versions.Add(newVersion);

            return newVersion;
        }

        public CourseVersion GetLatestVersion() => versions.OrderByDescending(version => version.PublicationDate).First();

        public void AddObserver(Guid userId)
        {
            if (observers.Any(obs => obs.UserId == userId))
                throw new InvalidStateException($"User with id: {userId} is already observing course: {CourseId}");

            observers.Add(new Observer(userId));
        }

        public void RemoveObserver(Guid userId)
        {
            if (!observers.Any(obs => obs.UserId == userId))
                return;

            observers = observers.Where(obs => obs.UserId != userId).ToList();
        }

        public void AddComment(Comment comment)
        {
            if (!CommentsEnabled)
                throw new InvalidStateException("Comments are disabled");

            comments.Add(comment);
        }

        public void DisableComments()
        {
            CommentsEnabled = false;
        }

        public void EnableComments()
        {
            CommentsEnabled = true;
        }
        public void AddCourseProgress(CourseProgress cp)
        {
            if (progresses.Any(p => p.UserId == cp.UserId && p.LessonId == cp.LessonId))
                return;
            
            progresses.Add(cp);
        }
    }
}
