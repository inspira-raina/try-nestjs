export default {
  user_id: {
    must_two_user: {
      code: 'ROOM_USER_MUST_TWO_USER',
      message: 'Room user must contain exactly two users',
    },
    must_not_admin: {
      code: 'ROOM_USER_MUST_NOT_ADMIN',
      message: 'User ID must not be an admin user',
    },
    not_allowed: {
      code: 'USER_NOT_ALLOWED',
      message: 'User is not allowed to perform this action',
    },
    should_not_admin: {
      code: 'USER_SHOULD_NOT_ADMIN',
      message: 'User should not be an admin user',
    },
  },
  room_id: {
    invalid: {
      code: 'ROOM_ID_INVALID',
      message: 'Invalid room ID format',
    },
    not_found: {
      code: 'ROOM_NOT_FOUND',
      message: 'Room not found',
    },
    private_cannot_remove_member: {
      code: 'ROOM_PRIVATE_CANNOT_REMOVE_MEMBER',
      message: 'A private room cannot remove its members',
    },
    blocked: {
      code: 'ROOM_BLOCKED',
      message: 'The room is blocked and cannot be accessed',
    },
  },
  type: {
    should_be_community: {
      code: 'ROOM_TYPE_SHOULD_BE_COMMUNITY',
      message: 'Room type should be Community',
    },
  },
};
