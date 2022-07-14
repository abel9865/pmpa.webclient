export interface WorkFlowItem {
    id: string;
    definitionId: string;
    tenantId: string;
    name: string;
    displayName: string;
    version: number;
    isSingleton: boolean;
    persistenceBehavior: string;
    isPublished: boolean;
    isLatest: boolean;
    customAttributes: string;
}

export interface WorkFlowItems {
    workFlowItems: WorkFlowItem[];
    totalCount: number;
}