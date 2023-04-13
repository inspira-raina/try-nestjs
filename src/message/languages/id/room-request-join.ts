export default {
  request_id: {
    not_found: {
      code: 'ROOM_REQUEST_JOIN_REQUEST_ID_NOT_FOUND',
      message:
        'Permintaan bergabung ruangan dengan ID tersebut tidak ditemukan',
    },
    has_been_submitted: {
      code: 'ROOM_REQUEST_JOIN_ALREADY_SUBMITTED',
      message: 'Permintaan bergabung ruang telah diajukan sebelumnya',
    },
  },
};
