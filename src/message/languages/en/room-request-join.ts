export default {
  request_id: {
    not_found: {
      code: 'ROOM_REQUEST_JOIN_REQUEST_ID_NOT_FOUND',
      message: 'Room join request with the given ID not found',
    },
    has_been_submitted: {
      code: 'ROOM_REQUEST_JOIN_ALREADY_SUBMITTED',
      message: 'Room join request has already been submitted',
    },
  },
};
