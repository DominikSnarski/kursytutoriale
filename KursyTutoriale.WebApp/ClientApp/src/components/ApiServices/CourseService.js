import apiClient from "../Auth/ApiClient"

export default function fetchCourse(courseID, caller){
    apiClient.get('api/CoursesViewer/GetCourse?id='+courseID)
   .then(response => {
       console.log('title: '+response.data.title);
        caller.setState({ name: response.data.title, isLoading: false, description: response.data.description, 
            price:response.data.price, tags:response.data.tags, creator: response.data.ownerId,
        popularity: response.data.popularity,
        rating: response.data.rating,
        modules: response.data.modules,
        creationDate: response.data.date,
        lastEditDate: response.data.dateOfLastEdit});

        
        //var example=[...Array(nrOfCourses).keys()].map(i => ({ id: (i + 1), name: response.data[i].title, date: response.data[i].date })); 
   }, error => {caller.setState({ error, isLoading: false })})
   .catch(function(error){
       console.log('cojest: '+error);
   });
}