import apiClient from '../ApiClient';

const SystemService = {
  getCurseCreationDefinitions: () => apiClient.get('/api/System/GetTags'),
};

export default SystemService;
