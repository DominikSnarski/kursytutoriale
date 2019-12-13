import apiClient from "../ApiClient"

export default function fetchDetails(courseID, caller){
     console.log(courseID)
    apiClient.get('/api/CoursesViewer/GetCourseDetails?courseId='+courseID)
   .then(response => {
        var title = response.data.title;
        var description = response.data.description;
        //var ownerID = response.data.ownerId;
        var price = response.data.price;
        var tags = response.data.tags;
        console.log(response.data)
        caller.setState({ title: title, isLoading: false, description: description, price:price, tags:tags});

        
        //var example=[...Array(nrOfCourses).keys()].map(i => ({ id: (i + 1), name: response.data[i].title, date: response.data[i].date })); 
   }, error => {caller.setState({ error, isLoading: false })})
}