export type UserManagementRow = {
  name: string;
  userName: string;
  emailId: string;
  associatedRoles: number;
  moduleAccess: string;
  lastLoginTime: string;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  /** Solid info icon beside created timestamp (legacy institute-join fallback) */
  showCreatedInfoIcon?: boolean;
};

export const USER_MANAGEMENT_ROWS: UserManagementRow[] = [
  {
    name: "Brown, Dr. Michael",
    userName: "michael.brown@university.edu",
    emailId: "michael.brown@university.edu",
    associatedRoles: 1,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/31/2026, 02:09:50 AM EDT",
    lastUpdatedDateTime: "03/31/2026, 02:09:50 AM EDT",
  },
  {
    name: "Johnson, Mary",
    userName: "mary.johnson@university.edu",
    emailId: "mary.johnson@university.edu",
    associatedRoles: 3,
    moduleAccess: "Admin, Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/30/2026, 11:42:18 AM EDT",
    lastUpdatedDateTime: "04/01/2026, 09:15:03 AM EDT",
  },
  {
    name: "Smith, Dr. Robert",
    userName: "robert.smith@university.edu",
    emailId: "robert.smith@university.edu",
    associatedRoles: 2,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/28/2026, 04:22:07 PM EDT",
    lastUpdatedDateTime: "03/28/2026, 04:22:07 PM EDT",
  },
  {
    name: "Davis, Sarah",
    userName: "sarah.davis@university.edu",
    emailId: "sarah.davis@university.edu",
    associatedRoles: 1,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/27/2026, 08:55:41 AM EDT",
    lastUpdatedDateTime: "03/29/2026, 01:30:12 PM EDT",
  },
  {
    name: "Wilson, James",
    userName: "james.wilson@university.edu",
    emailId: "james.wilson@university.edu",
    associatedRoles: 2,
    moduleAccess: "Admin",
    lastLoginTime: "05/07/2025, 08:26:10 AM EDT",
    createdDateTime: "01/15/2025, 10:00:00 AM EST",
    lastUpdatedDateTime: "05/06/2025, 03:44:22 PM EDT",
  },
  {
    name: "Miller, Jennifer",
    userName: "jennifer.miller@university.edu",
    emailId: "jennifer.miller@university.edu",
    associatedRoles: 1,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "02/10/2026, 09:18:33 AM EST",
    lastUpdatedDateTime: "02/10/2026, 09:18:33 AM EST",
  },
  {
    name: "Moore, David",
    userName: "david.moore@university.edu",
    emailId: "david.moore@university.edu",
    associatedRoles: 3,
    moduleAccess: "Admin, Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/01/2026, 07:12:05 PM EDT",
    lastUpdatedDateTime: "03/05/2026, 11:08:47 AM EDT",
  },
  {
    name: "Taylor, Lisa",
    userName: "lisa.taylor@university.edu",
    emailId: "lisa.taylor@university.edu",
    associatedRoles: 1,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/31/2026, 02:09:50 AM EDT",
    lastUpdatedDateTime: "03/31/2026, 02:09:50 AM EDT",
    showCreatedInfoIcon: true,
  },
  {
    name: "Anderson, Mark",
    userName: "mark.anderson@university.edu",
    emailId: "mark.anderson@university.edu",
    associatedRoles: 2,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/31/2026, 02:09:50 AM EDT",
    lastUpdatedDateTime: "03/31/2026, 02:09:50 AM EDT",
    showCreatedInfoIcon: true,
  },
  {
    name: "Thomas, Patricia",
    userName: "patricia.thomas@university.edu",
    emailId: "patricia.thomas@university.edu",
    associatedRoles: 1,
    moduleAccess: "Faculty",
    lastLoginTime: "No data found",
    createdDateTime: "03/25/2026, 06:40:19 PM EDT",
    lastUpdatedDateTime: "03/26/2026, 08:02:55 AM EDT",
  },
];
