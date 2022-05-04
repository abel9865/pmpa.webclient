

    export interface ClientProject {
        projectId: string;
        clientId: string;
        projectTitle: string;
        projectDescription: string;
        projectStatus: boolean;
        createdBy: string;
        createdDate: Date | null;
        lastUpdatedBy: string;
        lastUpdatedDate: string;
        client?: any;
        role?: any[];
    }



