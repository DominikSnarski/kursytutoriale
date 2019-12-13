import apiClient from "../ApiClient";

export const CourseService = {
    getCoursePages: (firstPage,lastPage) => {
        return apiClient.get('api/CoursesViewer/GetNumberOfCourses')
            .then(response => {
                var nrOfCourses=response.data;
                var nrOfPages=Math.ceil(response.data/4)-1;
                apiClient.get('api/CoursesViewer/GetPagesOfCourses?firstPageNumber='+firstPage+'&lastPageNumber='+nrOfPages+'&pageSize=4')
                .then(response => {  
                    var example=[...Array(nrOfCourses).keys()]
                    .map(i => ({
                         id: (i + 1),
                         name: response.data[i].title,
                         date: response.data[i].date 
                    }));

                    return new Promise((resolve)=>resolve(example));
                });

            }, error => {return new Promise((resolve,reject)=>reject(error))});
    },
    getCourse: (courseId) => {
        return apiClient.get('api/CoursesViewer/GetCourse?id='+courseId);
    },
    addCourse: () => (date, description, ownerId, tags, price, title) => {
        return new Promise((resolve, reject)=> 
            apiClient.post(
                '/api/CourseCreator/AddCourse',
                {
                    date, description, ownerId,  price, title, tags
                })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            )
    }
}