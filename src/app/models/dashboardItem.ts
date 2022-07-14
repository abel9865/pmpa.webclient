export interface DashboardItem {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canDownload: boolean;
    canSchedule: boolean;
    canOpen: boolean;
    canMove: boolean;
    canCopy: boolean;
    canClone: boolean;
    canCreateItem: boolean;
    id: string;
    itemType: string;
    name: string;
    description: string;
    itemLocation: string;
    createdById: number;
    createdByDisplayName: string;
    modifiedById: number;
    modifiedByFullName: string;
    categoryId: string;
    categoryName: string;
    createdDate: string;
    modifiedDate: string;
    itemModifiedDate: string;
    itemCreatedDate: string;
    isMultiDashboard: boolean;
    isFavorite: boolean;
    isPublic: boolean;
    tabDetail: TabDetail[];
}

export interface TabDetail {
    multiTabDashboardId: string;
    dashboardId: string;
    name: string;
    createdDate: string;
    modifiedDate: string;
}