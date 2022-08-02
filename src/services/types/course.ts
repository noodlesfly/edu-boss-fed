export interface ReqCourses {
    currentPage?: number;
    pageSize?: number;
    courseName?: string;
    status?: number;
}

export interface stateData {
    courseId: string;
    status: string | number;
}
