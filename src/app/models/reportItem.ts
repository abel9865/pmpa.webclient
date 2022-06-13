import { string } from "yup";

export interface ReportItem{

     canRead :boolean;

    canWrite :boolean;

    canDelete :boolean;

    canSchedule :boolean;

    canDownload :boolean;

    canOpen :boolean;

    canMove :boolean;

    canCopy:boolean;

    canClone :boolean
   canCreateItem :boolean;

    categoryId :string;
   categoryName :string;

    mdifiedById :number;

    createdByDisplayName :string

    createdById :number

    modifiedByFullName :string;

   itemLocation:string;

    itemType :number;

    id :string;

    ceatedDate:string;

    modifiedDate :string;

    itemModifiedDate :string

    itemCreatedDate:string;

    reportId :string;

    reportName :string;

    name :string;

    description :string

}