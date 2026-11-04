export type ManageUsersAssignedRow = {
  id: string;
  name: string;
  email: string;
};

/** Assigned users shown in Manage Users drawer (legacy mock). */
export const MANAGE_USERS_ASSIGNED_ROWS: ManageUsersAssignedRow[] = [
  { id: "1", name: "Brown, Dr. Michael", email: "michael.brown@university.edu" },
  { id: "2", name: "Brown, Dr. Michael", email: "michael.brown@example.edu" },
  { id: "3", name: "Davis, Susan", email: "susan.davis@university.edu" },
  { id: "4", name: "Davis, Susan", email: "susan.davis@example.edu" },
  { id: "5", name: "Johnson, Mary", email: "mary.johnson@university.edu" },
  { id: "6", name: "Johnson, Mary", email: "mary.johnson@example.edu" },
  { id: "7", name: "White, Karen", email: "karen.white@university.edu" },
  { id: "8", name: "White, Karen", email: "karen.white@example.edu" },
  { id: "9", name: "Mock Admin", email: "mock.admin@university.edu" },
  { id: "10", name: "Mock Admin", email: "mock.admin@example.edu" },
];

export const MANAGE_USERS_UNASSIGNED_ROWS: ManageUsersAssignedRow[] = [
  { id: "u1", name: "Smith, Dr. Robert", email: "robert.smith@university.edu" },
  { id: "u2", name: "Wilson, James", email: "james.wilson@university.edu" },
  { id: "u3", name: "Brown, Dr. Michael", email: "michael.brown@university.edu" },
  { id: "u4", name: "Davis, Susan", email: "susan.davis@university.edu" },
  { id: "u5", name: "Johnson, Mary", email: "mary.johnson@university.edu" },
  { id: "u6", name: "White, Dr. Karen", email: "karen.white@university.edu" },
  { id: "u7", name: "Alice, Stanley", email: "stanley.alice@university.edu" },
  { id: "u8", name: "Chen, Dr. Lisa", email: "lisa.chen@university.edu" },
  { id: "u9", name: "Garcia, Maria", email: "maria.garcia@university.edu" },
  { id: "u10", name: "Patel, Raj", email: "raj.patel@university.edu" },
  { id: "u11", name: "Nguyen, Thanh", email: "thanh.nguyen@university.edu" },
  { id: "u12", name: "O'Brien, Sean", email: "sean.obrien@university.edu" },
  { id: "u13", name: "Kim, Jennifer", email: "jennifer.kim@university.edu" },
  { id: "u14", name: "Advisee23, MockPL", email: "mockpl23@example.edu" },
  { id: "u15", name: "Admin, Mock", email: "ExxmockadminNUR@example.com" },
];

/** Unassigned table for Program Super Administrator (legacy sc2 mock). */
export const MANAGE_USERS_UNASSIGNED_ROWS_SC2: ManageUsersAssignedRow[] = [
  { id: "sc2-1", name: "Brown, Dr. Michael", email: "michael.brown@university.edu" },
  { id: "sc2-2", name: "Brown, Dr. Michael", email: "michael.brown@example.edu" },
  { id: "sc2-3", name: "Davis, Susan", email: "susan.davis@university.edu" },
  { id: "sc2-4", name: "Davis, Susan", email: "susan.davis@example.edu" },
  { id: "sc2-5", name: "Johnson, Mary", email: "mary.johnson@university.edu" },
  { id: "sc2-6", name: "Johnson, Mary", email: "mary.johnson@example.edu" },
  { id: "sc2-7", name: "White, Dr. Karen", email: "karen.white@university.edu" },
  { id: "sc2-8", name: "White, Dr. Karen", email: "karen.white@example.edu" },
  { id: "sc2-9", name: "Admin, Mock", email: "ExxmockadminNUR@example.com" },
  { id: "sc2-10", name: "Advisee23, MockPL", email: "mockpl23@example.edu" },
  { id: "sc2-11", name: "Alice, Stanley", email: "stanley.alice@university.edu" },
  { id: "sc2-12", name: "Alice, Stanley", email: "stanley.alice@example.edu" },
];
