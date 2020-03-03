import apiClient from "../ApiClient";

export const CourseService = {
    getCoursePages: (firstPage,lastPage) => {
        return apiClient.get('api/CoursesViewer/GetNumberOfCourses')
            .then(response => {
                var nrOfPages=Math.ceil(response.data/4)-1;
                
                return new Promise((resolve)=>resolve(apiClient.get('api/CoursesViewer/GetPagesOfCourses?firstPageNumber='+firstPage+'&lastPageNumber='+nrOfPages+'&pageSize=1')
                .then(res => {  
                    return new Promise((resolve)=>resolve(res.data));
                })));
            }, error => {return new Promise((resolve,reject)=>reject(error))});
    },
    getCourse: (courseId) => {
        return apiClient.get('api/CoursesViewer/GetCourse?id='+courseId);
    },
    addCourse: (date, description, ownerId, tags, price, title) => {
        return new Promise((resolve, reject)=> 
            apiClient.post(
                '/api/CourseCreator/AddCourse',
                {
                    date, description, ownerId,  price, title, tags
                })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            )
    },
    getUsersCourses: id => {
        return new Promise((resolve,reject)=>
            apiClient.get('api/CoursesViewer/GetUsersCourses?UserId='+id)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        )
    }
}