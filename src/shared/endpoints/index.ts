const UserEndpoints = {
    createUser: () => `/create`,
    loginUser: () => `/login`,
    updateUser: () => `/update`,
    getProfile: () => `/profile`,
    logoutUser: () => `/logout`,
}

const TaskEndpoints = {
    createTask: () => `/create`,
    getTasks: () => `/`,
    getTaskById: () => `/:id`,
    updateTask: () => `/update/:id`,
    deleteTask: () => `/:id`,
}

export { UserEndpoints, TaskEndpoints }