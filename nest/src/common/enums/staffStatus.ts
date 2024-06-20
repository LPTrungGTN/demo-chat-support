/* eslint-disable sort-keys-custom-order/object-keys */
export const StaffStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const;
export type StaffStatus = (typeof StaffStatus)[keyof typeof StaffStatus];
