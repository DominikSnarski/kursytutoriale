import apiClient from "../ApiClient"

const SystemService = {
    getCurseCreationDefinitions: ()=>{
        return apiClient.get('/api/System/GetTags');
    }
}

export default SystemService;