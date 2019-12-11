import apiClient from "../ApiClient"
import { resolve } from "dns";
import { reject } from "q";

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

   }, error => {caller.setState({ error, isLoading: false })})
   .catch(function(error){
       console.log('cojest: '+error);
   });
}

export const addCourse = (date, description, ownerId, tags, price, title) => {
    return apiClient.post(
          '/api/CourseCreator/AddCourse',
          {
            date, description, ownerId,  price, title, tags
          });
  }

export const CourseService = {
    getCoursePages: (firstPage,lastPage) => {
        apiClient.get('api/CoursesViewer/GetNumberOfCourses')
        .then(response => {  
            var nrOfCourses=response.data;
            var nrOfPages=Math.ceil(response.data/4)-1;

            return apiClient
            .get('api/CoursesViewer/GetPagesOfCourses?firstPageNumber='+firstPage+'&lastPageNumber='+lastPage+'&pageSize=4')
            // .then(response => {  
            //     var example=[...Array(nrOfCourses).keys()].map(i => ({ id: (i + 1), name: response.data[i].title, date: response.data[i].date }));
            //     caller.setState({ exampleItems: example, isLoading: false });  
    
            // });
    
        }, error => {return new Promise((resolve,reject)=>reject(error))});
    }
}