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

        public Guid CourseId { get; private set; }
        public Guid OwnerId { get; private set; }

        public IReadOnlyCollection<CourseVersion> Versions { get => versions.AsReadOnly(); }
        public IReadOnlyCollection<Observer> Observers { get => observers.AsReadOnly(); }

        public CoursePublicationProfile(Guid courseId, Guid ownerId)
        {
            CourseId = courseId;
            OwnerId = ownerId;

            versions = new List<CourseVersion>();
            versions.Add(new CourseVersion(1, 0, DateTime.Now));

            observers = new List<Observer>();
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

            observers = observers.Where(obs => obs.Id != userId).ToList();
        }
    }
}
